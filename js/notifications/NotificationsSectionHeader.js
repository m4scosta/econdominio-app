import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, StyleSheet } from 'react-native';


class NotificationsSectionHeader extends React.Component {

  props: {
    title: string;
  };

  render() {
    return (
      <LinearGradient colors={['#F4F6F7', '#EBEEF0']} style={styles.header}>
        <Text>
          {this.props.title}
        </Text>
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  header: {
    height: 32,
    justifyContent: 'center',
    paddingLeft: 17,
  },
});

export default NotificationsSectionHeader;
