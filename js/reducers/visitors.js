// @flow
import type { Action } from '../actions/types';

export type Visitor = {
  id: string;
  createdAt: number;
  name: string;
  rg: string;
  photo: any;
};

export type State = Array<Visitor>;

const initialState = [];

function visitors(state: State = initialState, action: Action): State {
  if (action.type === 'LOADED_VISITORS') {
    return action.visitors.map(fromParseObject);
  }
  return state;
}

function fromParseObject(object: Object): Visitor {
  return {
    id: object.id,
    createdAt: object.get('createdAt'),
    name: object.get('name'),
    rg: object.get('rg'),
    photo: object.get('photo')
  };
}

export default visitors;
