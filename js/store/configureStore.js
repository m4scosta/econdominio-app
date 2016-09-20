// @flow
import { createStore } from 'redux';
import actions from '../actions';
import reducers from '../reducers';

function configureStore() {
    return createStore(reducers);
}

export default configureStore;
