import { DateTime } from 'luxon';

const convertActivitiesToCalendarEvents = activities => activities
  .map(activity => ({
    id: activity.id,
    title: activity.comments,
    start: DateTime.fromISO(activity.startTime).toJSDate(),
    end: DateTime.fromISO(activity.endTime).toJSDate(),
  }));

export {
  convertActivitiesToCalendarEvents,
};
