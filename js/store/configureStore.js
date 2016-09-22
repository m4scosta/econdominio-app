// @flow
import { applyMiddleware, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import reducers from '../reducers';

var createAppStore = applyMiddleware(thunk)(createStore);

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createAppStore)(reducers);
  persistStore(store, { storage: AsyncStorage }, onComplete);
  return store;
}

export default configureStore;
