import uniqBy from 'lodash.uniqby';
import { ActivityAction, ActivityActionTypes } from './actions';
import { Activity } from './types';

export type ActivityReducerState = Activity[] | null;

export default function reducer(state: ActivityReducerState = null, action: ActivityAction) {
  switch (action.type) {
    case ActivityActionTypes.GET_ACTIVITIES_RESPONSE:
      const newActivities = action.payload.activities;
      return uniqBy((state || []).concat(newActivities), 'id');
    case ActivityActionTypes.CREATE_ACTIVITY_RESPONSE:
      return (state || []).concat(action.payload.activity);
    case ActivityActionTypes.UPDATE_ACTIVITY_RESPONSE:
    case ActivityActionTypes.PATCH_ACTIVITY_RESPONSE:
      return state?.map(activity => {
        if (activity.id === action.payload.activity.id) {
          return action.payload.activity;
        }
        return activity;
      });
    case ActivityActionTypes.DELETE_ACTIVITY_RESPONSE:
      return state?.filter(activity => activity.id !== action.payload.activityId);
    default:
      return state;
  }
}
