// @flow
import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import DrawerLayout from './common/DrawerLayout';
import MenuItem from './common/MenuItem';
import Divider from './common/Divider';
import GravatarImage from './common/GravatarImage';
import NotificationsView from './notifications/NotificationsView';
import VisitorsListingView from './visitors/VisitorsListingView';
import OccurrencesListingView from './occurrences/OccurrencesListingView';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToolbarAndroid from 'ToolbarAndroid';
import * as Animatable from 'react-native-animatable';
import { logout } from './actions';


class AppHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedView: null,
    }
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  render() {
    return (
      <DrawerLayout
        ref='drawer'
        drawerWidth={290}
        drawerPosition='left'
        renderNavigationView={this.renderNavigationView}>
        <View style={styles.content}>
          <Image
            source={require('../assets/bg.png')}
            style={[styles.container, styles.bg]}>
            {this.renderContent()}
          </Image>
        </View>
      </DrawerLayout>
    );
  }

  renderNavigationView() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/background.jpg')} style={{padding: 20}}>
          <GravatarImage
            email={this.props.username}
            style={{width: 70, height: 70, borderRadius: 35, marginTop: 80, borderWidth: 2, borderColor: 'white'}} />
          <Text style={{ marginTop: 5, fontSize: 15, color: 'white' }}>
            {this.props.username}
          </Text>
        </Image>

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
          onPress={() => this.props.logout()}
          />
      </View>
    );
  }

  onMenuItemSelected(selectedView) {
    this.setState({selectedView});
    this.refs.drawer.closeDrawer();
  }

  renderContent() {
    const { selectedView } = this.state;
    if (!selectedView || selectedView === 'home') {
      return (
        <NotificationsView />
      );
    }

    if (selectedView === 'visitors') {
      return (
        <VisitorsListingView navigator={this.props.navigator} />
      );
    }

    return (
      <OccurrencesListingView navigator={this.props.navigator} />
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
  },
  bg: {
    width: null,
    height: null,
    alignSelf: 'stretch',
  }
});

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
    username: state.user.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHome);
