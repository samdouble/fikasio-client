import { Project } from './types';

export enum ProjectActionTypes {
  CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST',
  CREATE_PROJECT_RESPONSE = 'CREATE_PROJECT_RESPONSE',
  GET_PROJECTS_REQUEST = 'GET_PROJECTS_REQUEST',
  GET_PROJECTS_RESPONSE = 'GET_PROJECTS_RESPONSE',
  UPDATE_PROJECT_REQUEST = 'UPDATE_PROJECT_REQUEST',
  UPDATE_PROJECT_RESPONSE = 'UPDATE_PROJECT_RESPONSE',
  PATCH_PROJECT_REQUEST = 'PATCH_PROJECT_REQUEST',
  PATCH_PROJECT_RESPONSE = 'PATCH_PROJECT_RESPONSE',
  DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST',
  DELETE_PROJECT_RESPONSE = 'DELETE_PROJECT_RESPONSE',
}

export type ProjectAction =
  | { type: ProjectActionTypes.CREATE_PROJECT_REQUEST; payload: { project: Partial<Project> } }
  | { type: ProjectActionTypes.CREATE_PROJECT_RESPONSE; payload: { project: Project } }
  | { type: ProjectActionTypes.GET_PROJECTS_REQUEST; payload: { projects: Project[] } }
  | { type: ProjectActionTypes.GET_PROJECTS_RESPONSE; payload: { projects: Project[] } }
  | { type: ProjectActionTypes.UPDATE_PROJECT_REQUEST; payload: { id: string; project: Project } }
  | { type: ProjectActionTypes.UPDATE_PROJECT_RESPONSE; payload: { project: Project } }
  | { type: ProjectActionTypes.PATCH_PROJECT_REQUEST; payload: { id: string; project: Partial<Project> } }
  | { type: ProjectActionTypes.PATCH_PROJECT_RESPONSE; payload: { project: Project } }
  | { type: ProjectActionTypes.DELETE_PROJECT_REQUEST; payload: { projectId: string } }
  | { type: ProjectActionTypes.DELETE_PROJECT_RESPONSE; payload: { projectId: string } };

export const createProjectRequest = (payload: { project: Partial<Project> }): ProjectAction => ({
  type: ProjectActionTypes.CREATE_PROJECT_REQUEST,
  payload,
});

export const createProjectResponse = (payload: { project: Project }): ProjectAction => ({
  type: ProjectActionTypes.CREATE_PROJECT_RESPONSE,
  payload,
});

export const getProjectsRequest = (payload: { projects: Project[] }): ProjectAction => ({
  type: ProjectActionTypes.GET_PROJECTS_REQUEST,
  payload,
});

export const getProjectsResponse = (payload: { projects: Project[] }): ProjectAction => ({
  type: ProjectActionTypes.GET_PROJECTS_RESPONSE,
  payload,
});

export const updateProjectRequest = (payload: { id, project: Project }): ProjectAction => ({
  type: ProjectActionTypes.UPDATE_PROJECT_REQUEST,
  payload,
});

export const updateProjectResponse = (payload: { project: Project }): ProjectAction => ({
  type: ProjectActionTypes.UPDATE_PROJECT_RESPONSE,
  payload,
});

export const patchProjectRequest = (payload: { id: string, project: Partial<Project> }): ProjectAction => ({
  type: ProjectActionTypes.PATCH_PROJECT_REQUEST,
  payload,
});

export const patchProjectResponse = (payload: { project: Project }): ProjectAction => ({
  type: ProjectActionTypes.PATCH_PROJECT_RESPONSE,
  payload,
});

export const deleteProjectRequest = (payload: { projectId: string }): ProjectAction => ({
  type: ProjectActionTypes.DELETE_PROJECT_REQUEST,
  payload,
});

export const deleteProjectResponse = (payload: { projectId: string }): ProjectAction => ({
  type: ProjectActionTypes.DELETE_PROJECT_RESPONSE,
  payload,
});
