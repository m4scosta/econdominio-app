import type { Action } from './types';

export function login(): Action {
	return {
		type: 'LOGGED_IN'
	}
}

export function logout(): Action {
	return {
		type: 'LOGGED_OUT'
	}
}
