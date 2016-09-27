// @flow
import { combineReducers } from 'redux';
import user from './user';
import notifications from './notifications';
import visitors from './visitors';


const appReducer = combineReducers({
  user: user,
  notifications: notifications,
  visitors: visitors,
});


const rootReducer = (state, action) => {
  if (action.type === 'LOGGED_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
}


export default rootReducer;
