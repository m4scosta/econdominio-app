import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Toolbar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Icon.ToolbarAndroid
          navIconName='bars'
          style={styles.toolbar}
          onIconClicked={() => this.context.openDrawer()}
          {...this.props} />

        <View style={styles.footer}>
          <View style={[ styles.colorFooter, { backgroundColor: 'red' } ]} />
          <View style={[ styles.colorFooter, { backgroundColor: 'blue' } ]} />
          <View style={[ styles.colorFooter, { backgroundColor: 'green' } ]} />
          <View style={[ styles.colorFooter, { backgroundColor: 'yellow' } ]} />
        </View>
      </View>
    );
  }
}


Toolbar.propTypes = {
  navigator: React.PropTypes.object,
}


Toolbar.contextTypes = {
  openDrawer: React.PropTypes.func,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: 'white',
    height: 56,
  },
  footer: {
    flexDirection: 'row',
    height: 2
  },
  colorFooter: {
    flex: 1,
    alignSelf: 'stretch',
  }
});
