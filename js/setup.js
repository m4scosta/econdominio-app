// @flow
import React, { Component } from 'react';
import Parse from 'parse/react-native';
import { Provider } from 'react-redux';
import { AppContainer } from './app';
import configureStore from './store/configureStore';
import {
  PARSE_SERVER_URL,
  PARSE_APP_ID,
  PARSE_JAVASCRIPT_KEY
} from './env';


function setup() {
  console.disableYellowBox = true;
  Parse.serverURL = PARSE_SERVER_URL;
  Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);


  class Root extends Component {

    state: {
      isLoading: boolean;
      store: any;
    }

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({ isLoading: false }))
      }
    }

    render() {
      if (this.state.isLoading) {
        return null;
      }
      return (
        <Provider store={this.state.store}>
          <AppContainer />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
