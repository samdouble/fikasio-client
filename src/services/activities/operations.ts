import { Dispatch } from 'redux';
import isEqual from 'lodash.isequal';
import {
  getActivities as APIgetActivities,
  createActivity as APIcreateActivity,
  updateActivity as APIupdateActivity,
  patchActivity as APIpatchActivity,
  deleteActivity as APIdeleteActivity,
} from './endpoints';
import { fetchOperation, fetchOnceOperation } from '../fetchOperation';
import {
  ActivityAction,
  createActivityRequest,
  createActivityResponse,
  getActivitiesRequest,
  getActivitiesResponse,
  updateActivityRequest,
  updateActivityResponse,
  patchActivityRequest,
  patchActivityResponse,
  deleteActivityRequest,
  deleteActivityResponse,
} from './actions';
import { Activity } from './types';

type ActivityDispatch = Dispatch<ActivityAction>;

interface ActivityFilter {
  startTime: number;
  endTime: number;
}

const fetchedActivitiesFilters: ActivityFilter[] = [];

function fetchActivities(filter, sort = {}) {
  const alreadyFetched = fetchedActivitiesFilters
    .some(f => isEqual(f, filter));
  if (!alreadyFetched) {
    fetchedActivitiesFilters.push(filter);
    return fetchOperation(
      getActivitiesRequest,
      getActivitiesResponse,
      APIgetActivities,
      state => state.activities,
      [filter, sort],
    );
  }
  return fetchOnceOperation(
    getActivitiesRequest,
    getActivitiesResponse,
    APIgetActivities,
    state => state.activities,
    [filter],
  );
}

function createActivity(activity: Partial<Activity>) {
  return (dispatch: ActivityDispatch) => {
    dispatch(createActivityRequest({ activity }));
    return APIcreateActivity(activity)
      .then(res => dispatch(createActivityResponse({ ...res })));
  };
}

function updateActivity(id: string, activity: Activity) {
  return (dispatch: ActivityDispatch) => {
    dispatch(updateActivityRequest({ id, activity }));
    return APIupdateActivity(id, activity)
      .then(res => dispatch(updateActivityResponse({ ...res })));
  };
}

function patchActivity(id, activity: Partial<Activity>) {
  return (dispatch: ActivityDispatch) => {
    dispatch(patchActivityRequest({ id, activity }));
    return APIpatchActivity(id, activity)
      .then(res => dispatch(patchActivityResponse({ ...res })));
  };
}

function deleteActivity(activityId: string) {
  return (dispatch: ActivityDispatch) => {
    dispatch(deleteActivityRequest({ activityId }));
    return APIdeleteActivity(activityId)
      .then(res => dispatch(deleteActivityResponse({ ...res })));
  };
}

const operations = {
  fetchActivities,
  createActivity,
  updateActivity,
  patchActivity,
  deleteActivity,
};

export default operations;
