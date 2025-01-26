import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime, Duration } from 'luxon';
import { AutosaveTextarea, Checkbox, DatePicker } from '@fikasio/react-ui-components';
import DropdownToggle from 'components/UI/DropdownToggle';
import {
  useAddActivityMutation,
  useDeleteActivityMutation,
  usePatchActivityMutation,
} from 'services/activities/api';
import { useAuth } from 'services/login/hooks';

const ActivityRow = ({
  activity,
  isSelected,
  onAddActivity,
  onClick,
  onDelete,
  onSelect,
}) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const me = auth.user;
  const [comments, setIComments] = useState((activity && activity.comments) || '');
  const [isStartDateTimeDatepickerOpen, setIsStartDateTimeDatepickerOpen] = useState(false);
  const [isEndDateTimeDatepickerOpen, setIsEndDateTimeDatepickerOpen] = useState(false);

  const startDateTime = activity.startTime && DateTime.fromJSDate(new Date(activity.startTime));
  const endDateTime = activity.endTime && DateTime.fromJSDate(new Date(activity.endTime));

  const [createActivity] = useAddActivityMutation();
  const [patchActivity] = usePatchActivityMutation();
  const [deleteActivity] = useDeleteActivityMutation();

  useEffect(() => {
    setIComments(activity.comments || '');
  }, [activity]);

  const handleDuplicateActivity = originalActivity => {
    createActivity(originalActivity);
  };

  const handleKeyDownComments = e => {
    if (e.key === 'Enter') {
      const start = DateTime.now().set({ minute: 0, second: 0, millisecond: 0 });
      const end = start.plus({ hour: 1 });
      onAddActivity({
        comments: '',
        startTime: start.toISO(),
        endTime: end.toISO(),
        duration: 60,
      });
      e.preventDefault();
    }
  };

  const handleKeyUpComments = (e, updatedActivity) => {
    if (updatedActivity) {
      if (e.key === 'Backspace' && e.target.textContent === '') {
        deleteActivity(updatedActivity.id);
      }
    } else if (e.target.textContent !== '') {
      createActivity({
        comments: e.target.textContent,
      });
    }
  };

  return (
    <tr className="activityRow">
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Checkbox
          isChecked={isSelected}
          onClick={() => onSelect(activity)}
        />
      </td>
      <td
        className="activityRow_comments"
        onClick={() => onClick && onClick({ id: activity.id })}
        style={{ cursor: 'pointer' }}
      >
        {
          me.censoredWords
            .some(censoredWord => comments.toLowerCase().includes(censoredWord.toLowerCase()))
            ? <div style={{ paddingLeft: 5 }}>*****</div>
            : (
                <AutosaveTextarea
                  className="activityRow_comments_editable"
                  defaultValue={comments}
                  onKeyDown={e => handleKeyDownComments(e)}
                  onKeyUp={e => handleKeyUpComments(e, activity)}
                  onSave={async value => {
                    patchActivity({
                      id: activity.id,
                      comments: value,
                    });
                  }}
                  style={{
                    float: 'left',
                    height: 25,
                    overflowY: 'hidden',
                    paddingLeft: 5,
                    paddingRight: 50,
                    paddingTop: 0,
                    width: 'auto',
                  }}
                  useContentEditableDiv
                />
              )
        }
      </td>
      <td
        onClick={() => setIsStartDateTimeDatepickerOpen(true)}
        style={{
          cursor: 'pointer',
          minWidth: 150,
        }}
      >
        <DatePicker
          defaultValue={DateTime.fromISO(activity.startTime).toJSDate()}
          displayFormat="yyyy-MM-dd HH:mm"
          isOpen={isStartDateTimeDatepickerOpen}
          onChange={date => {
            const timestamp = DateTime.fromJSDate(date)
              .set({ millisecond: 0 });
            if (activity.id) {
              const duration = endDateTime.diff(timestamp, 'minutes').minutes;
              patchActivity({
                id: activity.id,
                duration,
                startTime: timestamp.toISO(),
              });
            }
          }}
          shouldCloseOnSelect
          showTimeSelect
          timeCaption={t('hour')}
          timeFormat="HH:mm"
          timeIntervals={15}
        />
      </td>
      <td
        onClick={() => setIsEndDateTimeDatepickerOpen(true)}
        style={{
          cursor: 'pointer',
          minWidth: 150,
        }}
      >
        <DatePicker
          defaultValue={DateTime.fromISO(activity.endTime).toJSDate()}
          displayFormat="yyyy-MM-dd HH:mm"
          isOpen={isEndDateTimeDatepickerOpen}
          onChange={date => {
            const timestamp = DateTime.fromJSDate(date)
              .set({ millisecond: 0 });
            if (activity.id) {
              const duration = timestamp.diff(startDateTime, 'minutes').minutes;
              patchActivity({
                id: activity.id,
                duration,
                endTime: timestamp.toISO(),
              });
            }
          }}
          shouldCloseOnSelect
          showTimeSelect
          timeCaption={t('hour')}
          timeFormat="HH:mm"
          timeIntervals={15}
        />
      </td>
      <td>
        { activity.duration && Duration.fromMillis(activity.duration * 60 * 1000).toFormat('h:mm') }
      </td>
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Dropdown
          style={{
            position: 'static',
          }}
        >
          <Dropdown.Toggle as={DropdownToggle} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleDuplicateActivity(activity)}
            >
              <FontAwesomeIcon
                icon="copy"
                style={{
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('duplicate')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onDelete(activity)}
            >
              <FontAwesomeIcon
                icon="times"
                style={{
                  color: 'red',
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('delete')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default ActivityRow;
