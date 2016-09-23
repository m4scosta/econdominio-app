// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginScreen from './login/LoginScreen';
import AppNavigator from './AppNavigator';


class App extends Component {

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <LoginScreen />
      );
    } else {
      return (
        <AppNavigator />
      );
    }
  }
}


function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
}

export const AppContainer = connect(mapStateToProps)(App);
