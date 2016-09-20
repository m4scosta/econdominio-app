// @flow
import type { Action } from '../actions';

export type Config = {
  allowPush: boolean
}

const initialState: Config = {
  allowPush: true
}

function config(state: Config = initialState, action: Action) {
  console.log('asd', state, action);
  if (action.type === 'LOADED_CONFIG') {
    return {
      allowPush: action.config.allowPush || state.allowPush
    }
  }
  return state;
}

export default config;
