import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastAndroid, Vibration, Platform } from 'react-native';


class NotificationsController extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications.length !== this.props.notifications.length) {
      this.sendNotifications();
    }
  }

  sendNotifications() {
    ToastAndroid.show('Novas notificações recebidas', ToastAndroid.SHORT);
    var pattern;
    if (Platform.OS === 'android') {
      pattern = [0, 120, 75, 120];
    } else {
      pattern = [0, 1000, 2000, 3000];
    }
    Vibration.vibrate(pattern);
  }

  render() {
    return null;
  }
}


function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  };
}


export default connect(mapStateToProps)(NotificationsController);
