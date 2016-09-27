// @flow
type ParseObject = Object;

export type Action =
    { type: 'LOGGED_OUT' }
  | { type: 'LOGGED_IN', data: { id: string; username: string; } }
  | { type: 'LOADED_NOTIFICATIONS', notifications: Array<ParseObject> }
  | { type: 'LOADED_VISITORS', visitors: Array<ParseObject> }
  ;


export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
