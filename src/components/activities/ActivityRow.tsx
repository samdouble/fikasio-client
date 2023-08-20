import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import ContentEditable from 'react-contenteditable';
import ClickOutside from 'react-click-outside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime, Duration } from 'luxon';
import useTimeout from 'use-timeout';
import Checkbox from 'components/UI/Checkbox';
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
  const login = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const me = login.user;
  const [comments, setIComments] = useState((activity && activity.comments) || '');
  const [delay, setDelay] = useState<number | null>(null);
  const [, setSaved] = useState(false);
  const [isStartDateTimeDatepickerOpen, setIsStartDateTimeDatepickerOpen] = useState(false);
  const [isEndDateTimeDatepickerOpen, setIsEndDateTimeDatepickerOpen] = useState(false);

  const saveComments = () => {
    if (activity && comments !== '' && comments !== activity.comments) {
      operations.activities.patchActivity(activity.id, { comments })(dispatch)
        .then(() => setSaved(true));
    }
	};

  useTimeout(() => {
    saveComments();
    setDelay(null);
  }, delay);

  useEffect(() => {
    setIComments(activity.comments || '');
  }, [activity]);

  const setComments = val => {
    setDelay(400);
    setIComments(val);
  };

  const handleDuplicateActivity = originalActivity => {
    operations.activities.createActivity(originalActivity)(dispatch);
  };

  const handleKeyDownComments = e => {
    if (e.key === 'Enter') {
      const startDateTime = DateTime.now().set({ minute: 0, second: 0, millisecond: 0 });
      const endDateTime = startDateTime.plus({ hour: 1 });
      onAddActivity({
        comments: '',
        startTime: startDateTime.toISO(),
        endTime: endDateTime.toISO(),
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

  const startDateTime = activity.startTime && DateTime.fromJSDate(new Date(activity.startTime));
  const endDateTime = activity.endTime && DateTime.fromJSDate(new Date(activity.endTime));
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
            ? <div>*****</div>
            : (
                <ContentEditable
                  id={activity.id}
                  className="activityRow_comments_editable"
                  html={comments}
                  onKeyUp={e => handleKeyUpComments(e, activity)}
                  onKeyDown={e => handleKeyDownComments(e)}
                  onChange={e => setComments(e.target.value)}
                  onClick={e => e.stopPropagation()}
                  style={{
                    float: 'left',
                    outline: 'none',
                    paddingLeft: 5,
                    paddingRight: 50,
                    minWidth: 'auto',
                    cursor: 'auto',
                  }}
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
                .set({ millisecond: 0 })
                .toISO();
              if (activity.id) {
                operations.activities.patchActivity(activity.id, { startTime: timestamp })(dispatch);
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
                .set({ millisecond: 0 })
                .toISO();
              if (activity.id) {
                operations.activities.patchActivity(activity.id, { endTime: timestamp })(dispatch);
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
