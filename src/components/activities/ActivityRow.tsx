import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import ClickOutside from 'react-click-outside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime, Duration } from 'luxon';
import { AutosaveTextarea, Checkbox } from '@fikasio/react-ui-components';
import Datepicker from 'components/UI/Datepicker';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import { RootState } from 'services/store';

const ActivityRow = ({
  activity,
  isSelected,
  onAddActivity,
  onClick,
  onDelete,
  onSelect,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const login = useSelector((state: RootState) => state.login);
  const templates = useSelector((state: RootState) => state.templates);
  const me = login.user;
  const [comments, setIComments] = useState((activity && activity.comments) || '');
  const [isStartDateTimeDatepickerOpen, setIsStartDateTimeDatepickerOpen] = useState(false);
  const [isEndDateTimeDatepickerOpen, setIsEndDateTimeDatepickerOpen] = useState(false);

  const startDateTime = activity.startTime && DateTime.fromJSDate(new Date(activity.startTime));
  const endDateTime = activity.endTime && DateTime.fromJSDate(new Date(activity.endTime));

  const template = activity.templateId && templates?.find(temp => temp.id === activity.templateId);

  useEffect(() => {
    setIComments(activity.comments || '');
  }, [activity]);

  const handleDuplicateActivity = originalActivity => {
    operations.activities.createActivity(originalActivity)(dispatch);
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
        operations.activities.deleteActivity(updatedActivity.id)(dispatch);
      }
    } else if (e.target.textContent !== '') {
      operations.activities.createActivity({
        comments: e.target.textContent,
      })(dispatch);
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
          defaultIsChecked={isSelected}
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
                    operations.activities.patchActivity(activity.id, {
                      comments: value,
                    })(dispatch);
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
        }}
      >
        <ClickOutside
          onClickOutside={() => setIsStartDateTimeDatepickerOpen(false)}
        >
          <Datepicker
            defaultValue={DateTime.fromISO(activity.startTime).toMillis()}
            isOpen={isStartDateTimeDatepickerOpen}
            name="startTime"
            onBlur={() => setIsStartDateTimeDatepickerOpen(false)}
            onChange={date => {
              const timestamp = DateTime.fromJSDate(date)
                .set({ millisecond: 0 });
              if (activity.id) {
                const duration = endDateTime.diff(timestamp, 'minutes').minutes;
                operations.activities.patchActivity(activity.id, {
                  duration,
                  startTime: timestamp.toISO(),
                })(dispatch);
              }
            }}
            showTimeSelect
            timeCaption="Heure"
            timeFormat="HH:mm"
            timeIntervals={15}
          />
        </ClickOutside>
        { startDateTime && startDateTime.toFormat('yyyy-MM-dd HH:mm') }
      </td>
      <td
        onClick={() => setIsEndDateTimeDatepickerOpen(true)}
        style={{
          cursor: 'pointer',
        }}
      >
        <ClickOutside
          onClickOutside={() => setIsEndDateTimeDatepickerOpen(false)}
        >
          <Datepicker
            defaultValue={DateTime.fromISO(activity.endTime).toMillis()}
            isOpen={isEndDateTimeDatepickerOpen}
            name="endTime"
            onBlur={() => setIsEndDateTimeDatepickerOpen(false)}
            onChange={date => {
              const timestamp = DateTime.fromJSDate(date)
                .set({ millisecond: 0 });
              if (activity.id) {
                const duration = timestamp.diff(startDateTime, 'minutes').minutes;
                operations.activities.patchActivity(activity.id, {
                  duration,
                  endTime: timestamp.toISO(),
                })(dispatch);
              }
            }}
            showTimeSelect
            timeCaption="Heure"
            timeFormat="HH:mm"
            timeIntervals={15}
          />
        </ClickOutside>
        { endDateTime && endDateTime.toFormat('yyyy-MM-dd HH:mm') }
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
