// @flow
import type { Action } from '../actions/types';

type Notification = {
  id: string;
  createdAt: number;
  type: string;
  comment: string;
};

type State = Array<Notification>;

const initialState = [];

function notifications(state: State = initialState, action: Action): State {
  if (action.type === 'LOADED_NOTIFICATIONS') {
    return action.notifications.map(fromParseObject);
  }
  return state;
}

function fromParseObject(object: Object): Notification {
  return {
    id: object.id,
    createdAt: object.get('createdAt'),
    type: object.get('type'),
    comment: object.get('comment')
  };
}

export default notifications;
