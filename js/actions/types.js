// @flow
export type Action =
    { type: 'LOGGED_OUT' },
  | { type: 'LOGIN_FAILED' },
  | { type: 'LOGGED_IN', data: { id: string; username: string; } }
  ;


export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
