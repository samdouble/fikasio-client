import { ObjectiveAction, ObjectiveActionTypes } from './actions';
import { Objective } from './types';

export type ObjectiveReducerState = Objective[] | null;

export default function reducer (state: ObjectiveReducerState = null, action: ObjectiveAction) {
  switch (action.type) {
    case ObjectiveActionTypes.GET_OBJECTIVES_RESPONSE:
      return action.payload.objectives;
    case ObjectiveActionTypes.CREATE_OBJECTIVE_RESPONSE:
      return (state || []).concat(action.payload.objective);
    case ObjectiveActionTypes.UPDATE_OBJECTIVE_RESPONSE:
    case ObjectiveActionTypes.PATCH_OBJECTIVE_RESPONSE:
      return state?.map(objective => {
        if (objective.id === action.payload.objective.id) {
          return action.payload.objective;
        }
        return objective;
      });
    case ObjectiveActionTypes.DELETE_OBJECTIVE_RESPONSE:
      return state?.filter(objective => objective.id !== action.payload.objectiveId);
    default:
      return state;
  }
}
