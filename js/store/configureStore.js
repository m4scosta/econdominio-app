// @flow
import { createStore } from 'redux';
import reducers from '../reducers';

function configureStore() {
    return createStore(reducers);
}

export default configureStore;
