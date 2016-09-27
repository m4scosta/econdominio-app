import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  ScrollView,
  ListView,
  Image,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import NotificationsSectionHeader from './NotificationsSectionHeader';
import { formatDate, formatTime } from './datetimeFormats';
import { loadNotifications } from '../actions';


function groupNotificationsByDay(notifications) {
  var data = {};

  notifications.forEach((notification) => {
    var notificationDay = formatDate(notification.createdAt);
    var id = notification.objectId || notification.id;
    data[notificationDay] = data[notificationDay] || {};
    data[notificationDay][id] = notification;
  });

  return data;
}


class NotificationsView extends React.Component {

  constructor(props, context) {
    super(props, context);

    const groups = groupNotificationsByDay(this.props.notifications);

    let ds = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(groups),
    };

    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.renderListIcon = this.renderListIcon.bind(this);
  }

  componentWillMount() {
    this.props.loadNotifications();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications !== this.props.notifications) {
      const groups = groupNotificationsByDay(nextProps.notifications);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(groups),
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Icon.ToolbarAndroid
        navIconName='bars'
        style={styles.toolbar}
        onIconClicked={() => this.context.openDrawer()}
        title='Notificações' />

        <Animatable.View animation='fadeIn' duration={300} style={styles.container}>
          <ScrollView>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderSectionHeader={this.renderSectionHeader}
              renderSeparator={(sectionID, rowID) => <View style={styles.separator} key={rowID} />} />
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }

  renderRow(rowData) {
    const icon = this.renderListIcon(rowData)
    return (
      <View style={styles.listRowContainer}>
        {icon}
        <View>
          <Text>{rowData.comment}</Text>
          <Text style={{fontSize: 12}}>{formatTime(rowData.createdAt)}</Text>
        </View>
      </View>
    );
  }

  renderListIcon(rowData) {
    var icon;
    var iconName;
    var iconStyle;
    if (rowData.type === 'mail') {
      iconName = 'envelope';
      iconStyle = {color: 'lightslategray'};
    }
    if (rowData.type === 'visitor_arrived') {
      iconName = 'user';
      iconStyle = {color: 'darkseagreen'};
    }
    if (rowData.type === 'visitor_left') {
      iconName = 'user';
      iconStyle = {color: 'indianred'};
    }
    if (rowData.type === 'condo_notice') {
      iconName = 'bell';
      iconStyle = {color: 'royalblue'};
    }
    return <Icon name={iconName} style={[styles.listItemIcon, iconStyle]} size={20} />;
  }

  renderSectionHeader(sessionData, sessionId) {
    return <NotificationsSectionHeader title={sessionId} />;
  }
}


NotificationsView.contextTypes = {
  openDrawer: React.PropTypes.func,
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#eeeeee',
    height: 1,
  },
  listItemIcon: {
    marginRight: 15,
    alignSelf: 'center',
    width: 20,
    height: 20,
  },
  listRowContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  toolbar: {
    backgroundColor: 'lightgray',
    height: 56,
  },
});


function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    loadNotifications: () => dispatch(loadNotifications()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NotificationsView);
