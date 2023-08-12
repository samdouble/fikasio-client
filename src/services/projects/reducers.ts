import { ProjectAction, ProjectActionTypes } from './actions';
import { Project } from './types';

export default function reducer (state: Project[] | null = null, action: ProjectAction) {
  switch (action.type) {
    case ProjectActionTypes.GET_PROJECTS_RESPONSE:
      return action.payload.projects;
    case ProjectActionTypes.CREATE_PROJECT_RESPONSE:
      return (state || []).concat(action.payload.project);
    case ProjectActionTypes.UPDATE_PROJECT_RESPONSE:
    case ProjectActionTypes.PATCH_PROJECT_RESPONSE:
      return state?.map(project => {
        if (project.id === action.payload.project.id) {
          return action.payload.project;
        }
        return project;
      });
    case ProjectActionTypes.DELETE_PROJECT_RESPONSE:
      return state?.filter(project => project.id !== action.payload.projectId);
    default:
      return state;
  }
}
