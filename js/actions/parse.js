// @flow
import InteractionManager from 'InteractionManager';
import Parse from 'parse/react-native';
import type { ThunkAction } from './types';

const Notification = Parse.Object.extend('Notification');
const Visitor = Parse.Object.extend('Visitor');
const Occurrence = Parse.Object.extend('Occurrence');

function loadParseQuery(query: Parse.Query): ThunkAction {
  return new Promise(function (resolve, reject) {
    query.find({ success: resolve, error: reject });
  });
}

function buildNotificationsQuery(user) {
  var userQuery = new Parse.Query(Notification);
  userQuery.equalTo('username', user.get('username'));

  var condoQuery = new Parse.Query(Notification);
  condoQuery.equalTo('condo', user.get('condo').id);

  var mainQuery = new Parse.Query.or(userQuery, condoQuery);
  mainQuery.descending('createdAt');
  mainQuery.limit(100);

  return mainQuery;
}

function loadNotifications() {
  const type = 'LOADED_NOTIFICATIONS';

  return (dispatch) => {
    Parse.User.currentAsync()
      .then(buildNotificationsQuery)
      .then(loadParseQuery)
      .then((results) => {
        InteractionManager.runAfterInteractions(() => dispatch({type, results}));
      });
  }
}


function loadVisitors() {
  const type = 'LOADED_VISITORS';
  const query = new Parse.Query(Visitor);
  query.descending('createdAt');

  return (dispatch) => {
    Parse.User.currentAsync()
      .then((user) => {
        query.equalTo('residence', user.get('residence'));
        return query;
      })
      .then(loadParseQuery)
      .then((results) => {
        InteractionManager.runAfterInteractions(() => dispatch({type, results}));
      });
  }
}


function loadOccurrences() {
  const type = 'LOADED_OCCURRENCES';
  const query = new Parse.Query(Occurrence);
  query.descending('createdAt');

  return (dispatch) => {
    Parse.User.currentAsync()
      .then((user) => {
        query.equalTo('residence', user.get('residence'));
        return query;
      })
      .then(loadParseQuery)
      .then((results) => {
        InteractionManager.runAfterInteractions(() => dispatch({type, results}));
      });
  }
}


export { loadNotifications, loadVisitors, loadOccurrences };
