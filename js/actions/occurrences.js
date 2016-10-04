// @flow
import Parse from 'parse/react-native';
import type { Action, ThunkAction } from './types';
import { loadOccurrences } from './parse';


const Occurrence = Parse.Object.extend('Occurrence');
const defaultStatus = 'waiting';


function createOccurrence(title, type) {
  return Parse.User.currentAsync()
    .then((user) => {
      const occurrence = new Occurrence();
      occurrence.set('title', title);
      occurrence.set('type', type);
      occurrence.set('status', defaultStatus);
      occurrence.set('residence', user.get('residence'));
      return occurrence;
    });
}


function saveOccurrence(title, type): ThunkAction {
  return (dispatch) => {
    return createOccurrence(title, type)
      .then((occurrence) => occurrence.save())
      .then(() => dispatch(loadOccurrences()));
  }
}


function deleteOccurrence(occurrenceId) {
  return (dispatch) => {
    var q = new Parse.Query(Occurrence);
    return q.get(occurrenceId)
      .then((occurrence) => occurrence.destroy())
      .then(() => dispatch(loadOccurrences()));
  }
}


export { saveOccurrence, deleteOccurrence };
