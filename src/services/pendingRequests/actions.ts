export enum PendingRequestActionTypes {
  FETCH_REQUEST = 'FETCH_REQUEST',
  FETCH_RESPONSE = 'FETCH_RESPONSE',
}

export type PendingRequestAction =
  | { type: PendingRequestActionTypes.FETCH_REQUEST; payload: { type: string } }
  | { type: PendingRequestActionTypes.FETCH_RESPONSE; payload: { type: string, res: any } };

export const fetchRequest = fetchType => ({
  type: PendingRequestActionTypes.FETCH_REQUEST,
  payload: { type: fetchType },
});

export const fetchResponse = (fetchType, res = null) => ({
  type: PendingRequestActionTypes.FETCH_RESPONSE,
  payload: { type: fetchType, res },
});
