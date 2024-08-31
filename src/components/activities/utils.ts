import { DateTime } from 'luxon';
import { Activity } from 'services/activities/types';

const calculateFilledTime = (activities: Activity[], startTs, endTs) => {
  const startTsMillis = DateTime.fromISO(startTs).toMillis();
  const endTsMillis = DateTime.fromISO(endTs).toMillis();
  const sortedActivities = activities
    .sort((a, b) => (DateTime.fromISO(a.startTime) < DateTime.fromISO(b.startTime) ? -1 : 1));
  let unfilledTime = 0;
  let filledTime = 0;
  let movingTs = startTsMillis;
  const getCurrentActivity = ts => activities
    .find(a => DateTime.fromJSDate(a.startTime).toMillis() <= ts && DateTime.fromJSDate(a.endTime).toMillis() > ts);
  const getNextActivity = ts => sortedActivities
    .find(a => DateTime.fromJSDate(a.startTime).toMillis() > ts);
  while (movingTs < endTsMillis) {
    const activity = getCurrentActivity(movingTs);
    if (activity) {
      filledTime += (Math.min(endTsMillis, DateTime.fromJSDate(activity.endTime).toMillis()) - movingTs);
      movingTs = DateTime.fromJSDate(activity.endTime).toMillis();
    } else {
      const nextActivity = getNextActivity(movingTs);
      const nextTs = nextActivity
        ? Math.min(endTsMillis, DateTime.fromJSDate(nextActivity.startTime).toMillis())
        : endTsMillis;
      unfilledTime += (nextTs - movingTs);
      movingTs = nextTs;
    }
  }
  return {
    filledTime,
    unfilledTime,
  };
};

export {
  calculateFilledTime,
};
