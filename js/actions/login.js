// @flow
import Parse from 'parse/react-native';
import type { Action, ThunkAction } from './types';


function ParseUsernamePasswordLogin(username, password): Promise<any> {
  return new Promise((resolve, reject) => {
    Parse.User.logIn(username, password, {
      success: resolve,
      error: (user, error) => reject(error && error.error || error),
    });
  });
}


export function login(username: string, password: string): ThunkAction {
  return (dispatch) => {
    const login = ParseUsernamePasswordLogin(username, password);
    login.then((user) => {
      const action = {
        type: 'LOGGED_IN',
        data: {
          id: user.id,
          username: user.get('username')
        }
      };
      dispatch(action);
    });
    return login;
  }
}


export function logout(): Action {
  Parse.User.logOut();
  return {
    type: 'LOGGED_OUT'
  }
}
