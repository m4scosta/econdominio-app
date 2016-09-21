// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from './app';
import configureStore from './store/configureStore';

const store = configureStore();

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
