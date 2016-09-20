// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from './app';
import configureStore from './store/configureStore';
import loadConfig from './actions'

const store = configureStore();
store.dispatch(loadConfig());

function setup() {

  class Root extends Component {

    render() {
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
