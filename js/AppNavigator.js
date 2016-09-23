// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BackAndroid,
  Platform,
  StyleSheet,
  Navigator,
  Text
} from 'react-native';
import AppHome from './AppHome';


class AppNavigator extends Component {

  constructor(props) {
    super(props);
    this._handlers = [];

    this.handleBackButton = this.handleBackButton.bind(this);
    this.addBackButtonListener = this.addBackButtonListener.bind(this);
    this.removeBackButtonListener = this.removeBackButtonListener.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      return this.handleBackButton();
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', () => {
      return this.handleBackButton();
    });
  }

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener
    }
  }

  addBackButtonListener(listener) {
    this._handlers.push(listener);
  }

  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  }

  handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const { navigator } = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  }

  render() {
    return (
      <Navigator
        ref='navigator'
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        initialRoute={{}}
      />
    );
  }

  configureScene(route) {
    if (Platform.OS === 'android') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid;
    }
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  renderScene(route, navigator) {
    if (route.visitors) {
      return (
        <Text>VISITORS - NOT IMPLEMENTED YET</Text>
      );
    }

    if (route.events) {
      return (
        <Text>EVENTS - NOT IMPLEMENTED YET</Text>
      );
    }

    return (
      <AppHome />
    );
  }
}

AppNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});


export default connect()(AppNavigator);
