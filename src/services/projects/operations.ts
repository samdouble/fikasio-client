import { Dispatch } from 'redux';
import {
  getProjects as APIgetProjects,
  createProject as APIcreateProject,
  updateProject as APIupdateProject,
  patchProject as APIpatchProject,
  deleteProject as APIdeleteProject,
} from './endpoints';
import { fetchOnceOperation } from '../fetchOperation';
import {
  ProjectAction,
  createProjectRequest,
  createProjectResponse,
  getProjectsRequest,
  getProjectsResponse,
  updateProjectRequest,
  updateProjectResponse,
  patchProjectRequest,
  patchProjectResponse,
  deleteProjectRequest,
  deleteProjectResponse,
} from './actions';
import { Project } from './types';

type ProjectDispatch = Dispatch<ProjectAction>;

function fetchProjects(filter = {}) {
  return fetchOnceOperation(
    getProjectsRequest,
    getProjectsResponse,
    APIgetProjects,
    state => state.projects,
    [filter],
  );
}

function createProject(project: Partial<Project>) {
  return (dispatch: ProjectDispatch) => {
    dispatch(createProjectRequest({ project }));
    return APIcreateProject(project)
      .then(res => dispatch(createProjectResponse({ ...res })));
  };
}

function updateProject(id: string, project: Project) {
  return (dispatch: ProjectDispatch) => {
    dispatch(updateProjectRequest({ id, project }));
    return APIupdateProject(id, project)
      .then(res => dispatch(updateProjectResponse({ ...res })));
  };
}

function patchProject(id: string, project: Partial<Project>) {
  return (dispatch: ProjectDispatch) => {
    dispatch(patchProjectRequest({ id, project }));
    return APIpatchProject(id, project)
      .then(res => dispatch(patchProjectResponse({ ...res })));
  };
}

function deleteProject(projectId: string) {
  return (dispatch: ProjectDispatch) => {
    dispatch(deleteProjectRequest({ projectId }));
    return APIdeleteProject(projectId)
      .then(res => dispatch(deleteProjectResponse({ ...res })));
  };
}

const operations = {
  fetchProjects,
  createProject,
  updateProject,
  patchProject,
  deleteProject,
};

export default operations;
