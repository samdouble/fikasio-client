import { Activity } from './types';

export enum ActivityActionTypes {
  CREATE_ACTIVITY_REQUEST = 'CREATE_ACTIVITY_REQUEST',
  CREATE_ACTIVITY_RESPONSE = 'CREATE_ACTIVITY_RESPONSE',
  GET_ACTIVITIES_REQUEST = 'GET_ACTIVITIES_REQUEST',
  GET_ACTIVITIES_RESPONSE = 'GET_ACTIVITIES_RESPONSE',
  UPDATE_ACTIVITY_REQUEST = 'UPDATE_ACTIVITY_REQUEST',
  UPDATE_ACTIVITY_RESPONSE = 'UPDATE_ACTIVITY_RESPONSE',
  PATCH_ACTIVITY_REQUEST = 'PATCH_ACTIVITY_REQUEST',
  PATCH_ACTIVITY_RESPONSE = 'PATCH_ACTIVITY_RESPONSE',
  DELETE_ACTIVITY_REQUEST = 'DELETE_ACTIVITY_REQUEST',
  DELETE_ACTIVITY_RESPONSE = 'DELETE_ACTIVITY_RESPONSE',
}

export type ActivityAction =
  | { type: ActivityActionTypes.CREATE_ACTIVITY_REQUEST; payload: { activity: Activity } }
  | { type: ActivityActionTypes.CREATE_ACTIVITY_RESPONSE; payload: { activity: Activity } }
  | { type: ActivityActionTypes.GET_ACTIVITIES_REQUEST; payload: { activities: Activity[] } }
  | { type: ActivityActionTypes.GET_ACTIVITIES_RESPONSE; payload: { activities: Activity[] } }
  | { type: ActivityActionTypes.UPDATE_ACTIVITY_REQUEST; payload: { id: string; activity: Activity } }
  | { type: ActivityActionTypes.UPDATE_ACTIVITY_RESPONSE; payload: { activity: Activity } }
  | { type: ActivityActionTypes.PATCH_ACTIVITY_REQUEST; payload: { id: string; activity: Partial<Activity> } }
  | { type: ActivityActionTypes.PATCH_ACTIVITY_RESPONSE; payload: { activity: Activity } }
  | { type: ActivityActionTypes.DELETE_ACTIVITY_REQUEST; payload: { activityId: string } }
  | { type: ActivityActionTypes.DELETE_ACTIVITY_RESPONSE; payload: { activityId: string } };

export const createActivityRequest = (payload: { activity: Activity }): ActivityAction => ({
  type: ActivityActionTypes.CREATE_ACTIVITY_REQUEST,
  payload,
});

export const createActivityResponse = (payload: { activity: Activity }): ActivityAction => ({
  type: ActivityActionTypes.CREATE_ACTIVITY_RESPONSE,
  payload,
});

export const getActivitiesRequest = (payload: { activities: Activity[] }): ActivityAction => ({
  type: ActivityActionTypes.GET_ACTIVITIES_REQUEST,
  payload,
});

export const getActivitiesResponse = (payload: { activities: Activity[] }): ActivityAction => ({
  type: ActivityActionTypes.GET_ACTIVITIES_RESPONSE,
  payload,
});

export const updateActivityRequest = (payload: { id: string, activity: Activity }): ActivityAction => ({
  type: ActivityActionTypes.UPDATE_ACTIVITY_REQUEST,
  payload,
});

export const updateActivityResponse = (payload: { activity: Activity }): ActivityAction => ({
  type: ActivityActionTypes.UPDATE_ACTIVITY_RESPONSE,
  payload,
});

export const patchActivityRequest = (payload: { id: string, activity: Partial<Activity> }): ActivityAction => ({
  type: ActivityActionTypes.PATCH_ACTIVITY_REQUEST,
  payload,
});

export const patchActivityResponse = (payload: { activity: Activity }): ActivityAction => ({
  type: ActivityActionTypes.PATCH_ACTIVITY_RESPONSE,
  payload,
});

export const deleteActivityRequest = (payload: { activityId: string }): ActivityAction => ({
  type: ActivityActionTypes.DELETE_ACTIVITY_REQUEST,
  payload,
});

export const deleteActivityResponse = (payload: { activityId: string }): ActivityAction => ({
  type: ActivityActionTypes.DELETE_ACTIVITY_RESPONSE,
  payload,
});
