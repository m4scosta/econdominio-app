import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';


class Divider extends React.Component {

  render() {
    return (
      <View style={styles.divider} />
    );
  }
}


const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
});


export default Divider;
