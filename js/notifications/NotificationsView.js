import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToolbarAndroid from 'ToolbarAndroid';
import * as Animatable from 'react-native-animatable';


class NotificationsView extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View>
        <Icon.ToolbarAndroid
          navIconName='bars'
          style={styles.toolbar}
          onIconClicked={() => this.context.openDrawer()}
          title="Notificacoes" />
        <Animatable.View animation="fadeInUpBig" duration={1000}>
          <Text style={{alignSelf: 'center'}}>ANIMATED CONTENT EXAMPLE</Text>
        </Animatable.View>
      </View>
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
