// @flow
import type { Action } from '../actions/types';

type Occurrence = {
  id: string;
  createdAt: number;
  type: string;
  title: string;
  status: string;
};

type State = Array<Occurrence>;

const initialState = [];

function notifications(state: State = initialState, action: Action): State {
  if (action.type === 'LOADED_OCCURRENCES') {
    return action.occurrences.map(fromParseObject);
  }
  return state;
}

function fromParseObject(object: Object): Occurrence {
  return {
    id: object.id,
    createdAt: object.get('createdAt'),
    type: object.get('type'),
    title: object.get('title'),
    status: object.get('status'),
  };
}

export default notifications;
