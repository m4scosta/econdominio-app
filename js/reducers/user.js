// @flow
import type { Action } from '../actions/types';

export type State = {
  isLoggedIn: boolean;
  loginFailed: boolean;
  id: ?string;
  username: ?string;
  role: ?string;
};

const initialState = {
  isLoggedIn: false,
  id: null,
  username: null,
  loginFailed: false,
};

function user(state: State = initialState, action: Action): State {
  if (action.type === 'LOGGED_IN') {
    return {
      isLoggedIn: true,
      loginFailed: false,
      id: action.data.id,
      username: action.data.username,
      role: action.data.role
    }
  }
  if (action.type === 'LOGIN_FAILED') {
    return {
      isLoggedIn: false,
      loginFailed: true,
      id: null,
      username: null,
      role: null
    }
  }
  if (action.type === 'LOGGED_OUT') {
    return {
      isLoggedIn: false,
      loginFailed: false,
      id: null,
      username: null,
      role: null
    }
  }
  return state;
}

export default user;
