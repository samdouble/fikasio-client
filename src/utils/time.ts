import { DateTime } from 'luxon';
import { round } from './maths';

const convertMinutesToHM = minutes => {
  const roundedMinutes = round(minutes, 0);
  const hours = Math.floor(roundedMinutes / 60);
  return {
    hours,
    remainingMinutes: roundedMinutes - 60 * hours,
  };
};

export const convertMinutesToHumanHM = minutes => {
  const roundedMinutes = round(minutes, 0);
  if (minutes < 60) {
    return `${roundedMinutes} minutes`;
  }
  const { hours, remainingMinutes } = convertMinutesToHM(minutes);
  if (minutes < 300) {
    return `${round(minutes / 60, 1)} heures`;
  }
  const ceiledHours = hours + (remainingMinutes ? 1 : 0);
  return `${ceiledHours} heures`;
};

export const isSameDay = (dateTime1: DateTime, dateTime2: DateTime): boolean => {
  return dateTime1.toISODate() === dateTime2.toISODate();
};

export const isSameWeek = (ts1, ts2) => {
  const dateTs1 = DateTime.fromMillis(ts1);
  const dateTs2 = DateTime.fromMillis(ts2);
  return dateTs1.year === dateTs2.year && dateTs1.weekNumber === dateTs2.weekNumber;
};
