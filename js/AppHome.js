// @flow
import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import DrawerLayout from './common/DrawerLayout';
import MenuItem from './common/MenuItem';
import Divider from './common/Divider';
import NotificationsView from './notifications/NotificationsView';


class AppHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedView: null,
    }
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  render() {
    return (
      <DrawerLayout
        ref='drawer'
        drawerWidth={290}
        drawerPosition='left'
        renderNavigationView={this.renderNavigationView}>
        <View style={styles.content}>
          {this.renderContent()}
        </View>
      </DrawerLayout>
    );
  }

  renderNavigationView() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/background.jpg')} />
        <MenuItem
          iconName='bell'
          text='Notificações'
          onPress={this.onMenuItemSelected.bind(this, 'home')}
          />

        <MenuItem
          iconName='users'
          text='Visitantes'
          onPress={this.onMenuItemSelected.bind(this, 'visitors')}
          />

        <MenuItem
          iconName='pencil-square-o'
          text='Ocorrências'
          onPress={this.onMenuItemSelected.bind(this, 'events')}
          />

        <Divider />

        <MenuItem
          iconName='sign-out'
          text='Sair'
          onPress={this.onMenuItemSelected.bind(this, 'logout')}
          />
      </View>
    );
  }

  onMenuItemSelected(viewName) {
    this.setState({selectedView: viewName});
    this.refs.drawer.closeDrawer();
  }

  renderContent() {
    const { selectedView } = this.state;
    if (!selectedView || selectedView === 'home') {
      return (
        <NotificationsView />
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>{this.state.selectedView}</Text>
        </ScrollView>
      </View>
    );
  }

  getChildContext() {
    return {
      openDrawer: this.openDrawer,
    }
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }
}

AppHome.childContextTypes = {
  openDrawer: React.PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  }
});

// FixMe: add this function on connect()
function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

export default connect()(AppHome);
