import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropdown from 'react-bootstrap/Dropdown';
import ContentEditable from 'react-contenteditable';
import ClickOutside from 'react-click-outside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime, Duration } from 'luxon';
import useTimeout from 'use-timeout';
import Datepicker from 'components/UI/Datepicker';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';

const ActivityRow = ({
  activity,
  createActivity,
  deleteActivity,
  login,
  onAddActivity,
  onDeleteActivity,
  onSelect,
  patchActivity,
}) => {
  const me = login.user;
  const [comments, setIComments] = useState((activity && activity.comments) || '');
  const [delay, setDelay] = useState<number | null>(null);
  const [, setSaved] = useState(false);
  const [isStartDateTimeDatepickerOpen, setIsStartDateTimeDatepickerOpen] = useState(false);
  const [isEndDateTimeDatepickerOpen, setIsEndDateTimeDatepickerOpen] = useState(false);

  const saveComments = () => {
    if (activity && comments !== '' && comments !== activity.comments) {
      patchActivity(activity.id, { comments })
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

  const handleDuplicateActivity = activity => {
    createActivity(activity);
  };

  const handleKeyDown = e => {
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

  const handleKeyUp = (e, updatedActivity) => {
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

  const startDateTime = activity.startTime && DateTime.fromJSDate(new Date(activity.startTime));
  const endDateTime = activity.endTime && DateTime.fromJSDate(new Date(activity.endTime));
  return (
    <tr className="activityRow">
      <td
        className="activityRow_comments"
        onClick={() => onSelect && onSelect({ id: activity.id })}
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
                  onKeyUp={e => handleKeyUp(e, activity)}
                  onKeyDown={e => handleKeyDown(e)}
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
                patchActivity(activity.id, { startTime: timestamp });
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
                patchActivity(activity.id, { endTime: timestamp });
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
      <td width={35}>
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
              Copier
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onDeleteActivity(activity)}
            >
              <FontAwesomeIcon
                icon="times"
                style={{
                  color: 'red',
                  marginRight: 10,
                  width: 25,
                }}
              />
              Supprimer
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

function mapStateToProps(state) {
  return {
    activities: state.activities,
    login: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createActivity: operations.activities.createActivity,
    patchActivity: operations.activities.patchActivity,
    deleteActivity: operations.activities.deleteActivity,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityRow);
