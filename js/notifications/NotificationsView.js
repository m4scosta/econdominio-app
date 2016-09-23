import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToolbarAndroid from 'ToolbarAndroid';


class NotificationsView extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Icon.ToolbarAndroid
        navIconName='bars'
        style={styles.toolbar}
        onIconClicked={() => this.context.openDrawer()}
        title="Notificacoes" />
    );
  }
}

NotificationsView.contextTypes = {
  openDrawer: React.PropTypes.func,
};

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'gray',
    height: 56,
  },
});


export default NotificationsView;
