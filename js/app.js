// @flow
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LoginScreen from './login/LoginScreen';
import AppNavigator from './AppNavigator';
import PushNotificationController from './PushNotificationController';
import NotificationsController from './NotificationsController';


class App extends Component {

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <LoginScreen />
      );
    } else {
      return (
        <View style={styles.container}>
          <PushNotificationController />
          <AppNavigator />
          <NotificationsController />
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
}

export const AppContainer = connect(mapStateToProps)(App);
