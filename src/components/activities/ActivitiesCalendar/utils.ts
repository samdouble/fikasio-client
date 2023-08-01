import { DateTime } from 'luxon';

const convertActivitiesToCalendarEvents = (activities, censoredWords) => activities
  .map(activity => ({
    id: activity.id,
    title: censoredWords
      .some(censoredWord => activity.comments.toLowerCase().includes(censoredWord.toLowerCase()))
      ? '*****'
      : activity.comments,
    start: DateTime.fromISO(activity.startTime).toJSDate(),
    end: DateTime.fromISO(activity.endTime).toJSDate(),
  }));

export {
  convertActivitiesToCalendarEvents,
};
