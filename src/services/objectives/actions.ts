import { Objective } from './types';

export enum ObjectiveActionTypes {
  CREATE_OBJECTIVE_REQUEST = 'CREATE_OBJECTIVE_REQUEST',
  CREATE_OBJECTIVE_RESPONSE = 'CREATE_OBJECTIVE_RESPONSE',
  GET_OBJECTIVES_REQUEST = 'GET_OBJECTIVES_REQUEST',
  GET_OBJECTIVES_RESPONSE = 'GET_OBJECTIVES_RESPONSE',
  UPDATE_OBJECTIVE_REQUEST = 'UPDATE_OBJECTIVE_REQUEST',
  UPDATE_OBJECTIVE_RESPONSE = 'UPDATE_OBJECTIVE_RESPONSE',
  PATCH_OBJECTIVE_REQUEST = 'PATCH_OBJECTIVE_REQUEST',
  PATCH_OBJECTIVE_RESPONSE = 'PATCH_OBJECTIVE_RESPONSE',
  DELETE_OBJECTIVE_REQUEST = 'DELETE_OBJECTIVE_REQUEST',
  DELETE_OBJECTIVE_RESPONSE = 'DELETE_OBJECTIVE_RESPONSE',
}

export type ObjectiveAction =
  | { type: ObjectiveActionTypes.CREATE_OBJECTIVE_REQUEST; payload: { objective: Objective } }
  | { type: ObjectiveActionTypes.CREATE_OBJECTIVE_RESPONSE; payload: { objective: Objective } }
  | { type: ObjectiveActionTypes.GET_OBJECTIVES_REQUEST; payload: { objectives: Objective[] } }
  | { type: ObjectiveActionTypes.GET_OBJECTIVES_RESPONSE; payload: { objectives: Objective[] } }
  | { type: ObjectiveActionTypes.UPDATE_OBJECTIVE_REQUEST; payload: { id: string; objective: Objective } }
  | { type: ObjectiveActionTypes.UPDATE_OBJECTIVE_RESPONSE; payload: { objective: Objective } }
  | { type: ObjectiveActionTypes.PATCH_OBJECTIVE_REQUEST; payload: { id: string; objective: Partial<Objective> } }
  | { type: ObjectiveActionTypes.PATCH_OBJECTIVE_RESPONSE; payload: { objective: Objective } }
  | { type: ObjectiveActionTypes.DELETE_OBJECTIVE_REQUEST; payload: { objectiveId: string } }
  | { type: ObjectiveActionTypes.DELETE_OBJECTIVE_RESPONSE; payload: { objectiveId: string } };

export const createObjectiveRequest = (payload: { objective: Objective }): ObjectiveAction => ({
  type: ObjectiveActionTypes.CREATE_OBJECTIVE_REQUEST,
  payload,
});

export const createObjectiveResponse = (payload: { objective: Objective }): ObjectiveAction => ({
  type: ObjectiveActionTypes.CREATE_OBJECTIVE_RESPONSE,
  payload,
});

export const getObjectivesRequest = (payload: { objectives: Objective[] }): ObjectiveAction => ({
  type: ObjectiveActionTypes.GET_OBJECTIVES_REQUEST,
  payload,
});

export const getObjectivesResponse = (payload: { objectives: Objective[] }): ObjectiveAction => ({
  type: ObjectiveActionTypes.GET_OBJECTIVES_RESPONSE,
  payload,
});

export const updateObjectiveRequest = (payload: { id: string, objective: Objective }): ObjectiveAction => ({
  type: ObjectiveActionTypes.UPDATE_OBJECTIVE_REQUEST,
  payload,
});

export const updateObjectiveResponse = (payload: { objective: Objective }): ObjectiveAction => ({
  type: ObjectiveActionTypes.UPDATE_OBJECTIVE_RESPONSE,
  payload,
});

export const patchObjectiveRequest = (payload: { id: string, objective: Partial<Objective> }): ObjectiveAction => ({
  type: ObjectiveActionTypes.PATCH_OBJECTIVE_REQUEST,
  payload,
});

export const patchObjectiveResponse = (payload: { objective: Objective }): ObjectiveAction => ({
  type: ObjectiveActionTypes.PATCH_OBJECTIVE_RESPONSE,
  payload,
});

export const deleteObjectiveRequest = (payload: { objectiveId: string }): ObjectiveAction => ({
  type: ObjectiveActionTypes.DELETE_OBJECTIVE_REQUEST,
  payload,
});

export const deleteObjectiveResponse = (payload: { objectiveId: string }): ObjectiveAction => ({
  type: ObjectiveActionTypes.DELETE_OBJECTIVE_RESPONSE,
  payload,
});
