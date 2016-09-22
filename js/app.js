// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text
} from 'react-native';
import { Button } from 'react-native-material-design';
import { logout, login } from './actions';
import { bindActionCreators } from 'redux';
import LoginScreen from './login/LoginScreen';


class App extends Component {

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <LoginScreen />
      );
    } else {
      return (
        <View>
            <Text>Hello {this.props.username}</Text>

            <Button
                text={'SAIR'}
                onPress={ () => this.props.logout() } />
        </View>
      );
    }
  }
}


function mapStateToProps(state) {
  console.log(state);
  return {
    isLoggedIn: state.user.isLoggedIn,
    username: state.user.username
  }
}


function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    login: () => dispatch(login())
  }
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
