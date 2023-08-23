import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, luxonLocalizer, Event } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import useTimeout from 'use-timeout';
import { operations } from 'services';
import { Activity } from 'services/activities/types';
import { RootState } from 'services/store';
import Toolbar from './Toolbar';
import { convertActivitiesToCalendarEvents } from './utils';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './ActivitiesCalendar.scss';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

const ActivitiesCalendar = ({
  activities,
  date,
  onActivityClick,
}) => {
  const dispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.login);
  const templates = useSelector((state: RootState) => state.templates);
  const me = loginState.user;
  const [delay, setDelay] = useState<number | null>(null);
  const [newActivity, setNewActivity] = useState<Activity | null>(null);
  const [events, setEvents] = useState<Event[]>(convertActivitiesToCalendarEvents(activities, me.censoredWords));
  const { t } = useTranslation();

  useEffect(() => {
    setEvents(
      convertActivitiesToCalendarEvents(activities, me.censoredWords),
    );
  }, [activities]);

  useTimeout(() => {
    if (newActivity) {
      document.getElementById(newActivity.id)?.focus();
      setDelay(null);
      setNewActivity(null);
    }
  }, delay);

  const handleSelectSlots = ({ start, end }) => {
    const startTime = DateTime.fromJSDate(start)
    const endTime = DateTime.fromJSDate(end);
    onActivityClick({
      startTime: startTime.toISO(),
      endTime: endTime.toISO(),
      duration: endTime.diff(startTime, 'minutes').minutes,
    });
  };

  const handleViewChange = view => {
    if (view === 'week') {
      const startOfWeek = date.startOf('week');
      const startTs = startOfWeek
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        }).toISO();
      const endTs = startOfWeek
        .plus({ days: 6 })
        .set({
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 999,
        }).toISO();

      dispatch(operations.activities.fetchActivities({
        startTime: startTs,
        endTime: endTs,
      }));
    }
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = ({ event, start, end }) => {
    const activity = activities.find(a => a.id === event.id);
    const startTime = DateTime.fromJSDate(start);
    const endTime = DateTime.fromJSDate(end);
    const duration = endTime.diff(startTime, 'minutes').minutes;
    dispatch(
      operations.activities.patchActivity(activity.id, {
        startTime: startTime.toISO(),
        endTime: endTime.toISO(),
        duration,
      }),
    );
  };

  const onEventResize: withDragAndDropProps['onEventResize'] = ({ start, end, event }) => {
    const activity = activities.find(a => a.id === event.id);
    const hasDraggedStart = event.start !== start;
    const hasDraggedEnd = event.end !== end;
    const startTime = hasDraggedStart
      ? DateTime.fromJSDate(start)
      : DateTime.fromISO(activity.startTime);
    const endTime = hasDraggedEnd
      ? DateTime.fromJSDate(end)
      : DateTime.fromISO(activity.endTime);
    const duration = endTime.diff(startTime, 'minutes').minutes;
    dispatch(
      operations.activities.patchActivity(activity.id, {
        ...(hasDraggedStart && { startTime: startTime.toISO() }),
        ...(hasDraggedEnd && { endTime: endTime.toISO() }),
        duration,
      }),
    );
  };

  return events && (
    <DnDCalendar
      components={{
        toolbar: Toolbar,
      }}
      date={date.toJSDate()}
      dayLayoutAlgorithm="no-overlap"
      defaultView="day"
      eventPropGetter={event => {
        const template = event.templateId && templates?.find(temp => temp.id === event.templateId);
        return {
          style: {
            ...(template && { backgroundColor: template.color }),
          },
        };
      }}
      events={events}
      localizer={localizer}
      messages={{
        month: t('month'),
        week: t('week'),
        day: t('day'),
      }}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      onNavigate={() => undefined}
      onSelectEvent={event => onActivityClick({ id: event.id })}
      onSelectSlot={handleSelectSlots}
      onView={handleViewChange}
      resizable
      selectable
      showMultiDayTimes
      step={15}
      timeslots={4}
      views={['day', 'week']}
    />
  );
}

export default ActivitiesCalendar;
