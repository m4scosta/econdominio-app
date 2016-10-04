// @flow
import Parse from 'parse/react-native';
import type { Action, ThunkAction } from './types';
import { loadOccurrences } from './parse';


const Occurrence = Parse.Object.extend('Occurrence');
const defaultStatus = 'waiting';


function createOccurrence(newOccurrence) {
  return Parse.User.currentAsync()
    .then((user) => {
      const occurrence = new Occurrence();
      occurrence.set('title', newOccurrence.title);
      occurrence.set('type', newOccurrence.type);
      occurrence.set('status', defaultStatus);
      occurrence.set('residence', user.get('residence'));
      return occurrence;
    });
}


function updateOccurrence(newOccurrence) {
  var q = new Parse.Query(Occurrence);
  return q.get(newOccurrence.id)
    .then((occurrence) => {
      occurrence.set('title', newOccurrence.title);
      occurrence.set('type', newOccurrence.type);
      occurrence.set('status', newOccurrence.status);
      occurrence.set('residence', newOccurrence.residence);
      return occurrence;
    });
}


function saveOccurrence(occurrence): ThunkAction {
  return (dispatch) => {
    var query;
    if (occurrence.id) {
      query = updateOccurrence(occurrence);
    } else {
      query = createOccurrence(occurrence);
    }
    console.log(query);
    return query
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
