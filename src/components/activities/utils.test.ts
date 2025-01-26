import { Activity } from 'services/activities/types';
import {
  calculateFilledTime,
} from './utils';

describe('calculateFilledTime', () => {
  it('Calculates correctly filledTime and unfilledTime (very small overlap between 2 activities)', () => {
    const activities: Activity[] = [
      {
        id: '9dadf7ba-b21d-4cb4-859f-5eec9c5e357f',
        createdAt: '2022-04-30T11:39:06.606-04:00',
        startTime: '2022-04-30T00:30:00.253-04:00',
        endTime: '2022-04-30T06:15:00.672-04:00',
        duration: 345,
        comments: 'Dormir',
      },
      {
        id: '8176a232-5ebd-4fd9-8ec5-367d55aa514f',
        createdAt: '2022-04-30T11:39:21.941-04:00',
        startTime: '2022-04-30T06:15:00.253-04:00',
        endTime: '2022-04-30T06:45:00.672-04:00',
        duration: 30,
        comments: 'Tester mon code',
      },
      {
        id: 'db870382-f16a-43d2-8efa-b0d263596f80',
        createdAt: '2022-04-30T11:39:35.269-04:00',
        startTime: '2022-04-30T06:45:00.253-04:00',
        endTime: '2022-04-30T08:45:00.672-04:00',
        duration: 120,
        comments: 'Dormir',
      },
      {
        id: '627914ee-6145-4184-aec8-45b9d4b6d8c5',
        createdAt: '2022-04-30T23:53:52.390-04:00',
        startTime: '2022-04-30T10:45:00.232-04:00',
        endTime: '2022-04-30T11:15:00.457-04:00',
        duration: 30,
        comments: 'Aller voir mon nouvel appartement et régler les derniers détails avec Priyanka',
      },
      {
        id: '247cb36e-89fb-455d-9ea8-4c25635b1f72',
        createdAt: '2022-04-30T23:56:20.612-04:00',
        startTime: '2022-04-30T13:00:00.232-04:00',
        endTime: '2022-04-30T15:15:00.457-04:00',
        duration: 135,
        comments: 'Déménagement',
      }];
    const startTime = '2022-04-30T00:00:00-04:00';
    const endTime = '2022-04-30T23:59:59-04:00';
    const res = calculateFilledTime(activities, startTime, endTime);
    expect(res).toEqual({
      filledTime: 39600869,
      unfilledTime: 46798131,
    });
  });
});
