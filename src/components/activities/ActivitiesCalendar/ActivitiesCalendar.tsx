import React, { useState, useEffect } from 'react';
import { Calendar, luxonLocalizer, Event } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import useTimeout from 'use-timeout';
import Color from 'color';
import { useGetActivitiesQuery, usePatchActivityMutation } from 'services/activities/api';
import { Activity } from 'services/activities/types';
import { useAuth } from 'services/login/hooks';
import { useGetTemplatesQuery } from 'services/templates/api';
import Toolbar from './Toolbar';
import { convertActivitiesToCalendarEvents } from './utils';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './ActivitiesCalendar.scss';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

const ActivitiesCalendar = ({
  date,
  onActivityClick,
}) => {
  const { data: templates } = useGetTemplatesQuery();
  const auth = useAuth();
  const me = auth.user;
  const [delay, setDelay] = useState<number | null>(null);
  const [newActivity, setNewActivity] = useState<Activity | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const { t } = useTranslation();
  const [period, setPeriod] = useState('day');
  const startTs = date.startOf(period);
  const startTsIso = startTs.toISO();
  const endTs = date.endOf(period);
  const endTsIso = endTs.toISO();
  const { data: activities, refetch } = useGetActivitiesQuery({
    filter: {
      startTime: startTsIso,
      endTime: endTsIso,
    },
  });

  const [patchActivity] = usePatchActivityMutation();

  useEffect(() => {
    refetch();
  }, [startTsIso, endTsIso]);

  useEffect(() => {
    if (activities) {
      setEvents(
        convertActivitiesToCalendarEvents(activities, me.censoredWords),
      );
    }
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

  const onEventDrop: withDragAndDropProps['onEventDrop'] = ({ event, start, end }) => {
    const startTime = DateTime.fromJSDate(start);
    const endTime = DateTime.fromJSDate(end);
    const duration = endTime.diff(startTime, 'minutes').minutes;
    const activity = activities?.find(a => a.id === event.id);
    if (activity) {
      patchActivity({
        id: activity.id,
        startTime: startTime.toISO(),
        endTime: endTime.toISO(),
        duration,
      });
    }
  };

  const onEventResize: withDragAndDropProps['onEventResize'] = ({ start, end, event }) => {
    const hasDraggedStart = event.start !== start;
    const hasDraggedEnd = event.end !== end;
    const activity = activities?.find(a => a.id === event.id);
    if (activity) {
      const startTime = hasDraggedStart
        ? DateTime.fromJSDate(start)
        : DateTime.fromISO(activity.startTime);
      const endTime = hasDraggedEnd
        ? DateTime.fromJSDate(end)
        : DateTime.fromISO(activity.endTime);
      const duration = endTime.diff(startTime, 'minutes').minutes;
      patchActivity({
        id: activity.id,
        ...(hasDraggedStart && { startTime: startTime.toISO() }),
        ...(hasDraggedEnd && { endTime: endTime.toISO() }),
        duration,
      });
    }
  };

  return events && (
    <DnDCalendar
      components={{
        toolbar: Toolbar,
      }}
      date={date.toJSDate()}
      dayLayoutAlgorithm="no-overlap"
      defaultView="day"
      eventPropGetter={(event, start, end, isSelected) => {
        const defaultEventColor = '#7e5b9a';
        const template = event.templateId && templates?.find(temp => temp.id === event.templateId);
        return {
          style: {
            backgroundColor: (template && template.color)
              ? (isSelected ? Color(template.color).darken(0.2) : template.color)
              : (isSelected ? Color(defaultEventColor).darken(0.2) : defaultEventColor),
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
      onView={view => setPeriod(view)}
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
