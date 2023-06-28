import { Dispatch } from 'redux';
import {
  getObjectives as APIgetObjectives,
  createObjective as APIcreateObjective,
  updateObjective as APIupdateObjective,
  patchObjective as APIpatchObjective,
  deleteObjective as APIdeleteObjective,
} from './endpoints';
import { fetchOnceOperation } from '../fetchOperation';
import {
  createObjectiveRequest,
  createObjectiveResponse,
  getObjectivesRequest,
  getObjectivesResponse,
  updateObjectiveRequest,
  updateObjectiveResponse,
  patchObjectiveRequest,
  patchObjectiveResponse,
  deleteObjectiveRequest,
  deleteObjectiveResponse,
  ObjectiveAction,
} from './actions';
import { Objective } from './types';

type ObjectiveDispatch = Dispatch<ObjectiveAction>;

function fetchObjectives(filter = {}) {
  return fetchOnceOperation(
    getObjectivesRequest,
    getObjectivesResponse,
    APIgetObjectives,
    state => state.objectives,
    [filter],
  );
}

function createObjective(objective: Objective) {
  return (dispatch: ObjectiveDispatch) => {
    dispatch(createObjectiveRequest({ objective }));
    return APIcreateObjective(objective)
      .then(res => dispatch(createObjectiveResponse({ ...res })));
  };
}

function updateObjective(id: string, objective: Objective) {
  return (dispatch: ObjectiveDispatch) => {
    dispatch(updateObjectiveRequest({ id, objective }));
    return APIupdateObjective(id, objective)
      .then(res => dispatch(updateObjectiveResponse({ ...res })));
  };
}

function patchObjective(id: string, objective: Partial<Objective>) {
  return (dispatch: ObjectiveDispatch) => {
    dispatch(patchObjectiveRequest({ id, objective }));
    return APIpatchObjective(id, objective)
      .then(res => dispatch(patchObjectiveResponse({ ...res })));
  };
}

function deleteObjective(objectiveId: string) {
  return (dispatch: ObjectiveDispatch) => {
    dispatch(deleteObjectiveRequest({ objectiveId }));
    return APIdeleteObjective(objectiveId)
      .then(res => dispatch(deleteObjectiveResponse({ ...res })));
  };
}

const operations = {
  fetchObjectives,
  createObjective,
  updateObjective,
  patchObjective,
  deleteObjective,
};

export default operations;
