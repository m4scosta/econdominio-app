// @flow
import Parse from 'parse/react-native';
import type { Action, ThunkAction } from './types';


function parseUsernamePasswordLogin(username, password): Promise<any> {
  return new Promise((resolve, reject) => {
    Parse.User.logIn(username, password, {
      success: resolve,
      error: (user, error) => reject(error && error.error || error),
    });
  });
}


export function login(email: String, password: String): ThunkAction {
  return (dispatch) => {
    // email is used as Parse.User username
    return parseUsernamePasswordLogin(email, password)
      .then((user) => {
        const action = {
          type: 'LOGGED_IN',
          data: {
            id: user.id,
            username: user.get('username'),
            role: user.get('role')
          }
        };
        dispatch(action);
      });
  }
}


export function logout(): Action {
  Parse.User.logOut();
  return {
    type: 'LOGGED_OUT'
  }
}
