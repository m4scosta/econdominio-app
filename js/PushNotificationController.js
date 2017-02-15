// @flow
import React, { Component } from 'react';
import Parse from 'parse/react-native';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import { GCM_SENDER_ID } from './env';
import { storeDeviceToken, loadNotifications } from './actions';


class PushNotificationController extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    PushNotification.configure({
      onRegister: this.props.storeDeviceToken,
      onNotification: this.props.receivePushNotification,
      senderID: GCM_SENDER_ID,
      popInitialNotification: true,
    });
  }

  render() {
    return null;
  }
}


function mapDispatchToProps(dispatch) {
  return {
    storeDeviceToken: storeDeviceToken,
    receivePushNotification: (notif) => dispatch(loadNotifications()),
  };
}


export default connect(null, mapDispatchToProps)(PushNotificationController);
