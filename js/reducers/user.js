// @flow
import type { Action } from '../actions/types';

export type State = {
    isLoggedIn: boolean;
};

const initialState = {
    isLoggedIn: false
};

function user(state: State = initialState, action: Action): State {
    console.log('asd', state, action);
    if (action.type === 'LOGGED_IN') {
        return {
            isLoggedIn: true
        }
    }
    if (action.type === 'LOGGED_OUT') {
        return {
            isLoggedIn: false
        }
    }
    return state;
}

export default user;
