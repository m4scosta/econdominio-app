// @flow
import Parse from 'parse/react-native';
import type { Action, ThunkAction } from './types';
import { loadVisitors } from './parse';


const Visitor = Parse.Object.extend('Visitor');


function createVisitor(name, rg, photo) {
  return Parse.User.currentAsync()
    .then((user) => {
      const visitor = new Visitor();
      visitor.set('name', name);
      visitor.set('rg', rg);
      visitor.set('photo', photo);
      visitor.set('residence', user.get('residence'));
      return visitor;
    });
}


function saveBase64File(base64): Promise {
  const file = new Parse.File('test.png', {base64});
  return file.save();
}


function saveVisitor(name, rg, base64Photo): ThunkAction {
  return (dispatch) => {
    return saveBase64File(base64Photo)
      .then((photo) => createVisitor(name, rg, photo))
      .then((visitor) => visitor.save())
      .then(() => dispatch(loadVisitors()));
  }
}


export { saveVisitor };
