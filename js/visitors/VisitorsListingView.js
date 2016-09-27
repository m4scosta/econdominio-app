import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ListView, StyleSheet } from 'react-native';
import { loadVisitors } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';


class VisitorsListingView extends Component {

  constructor(props, context) {
    super(props, context);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.visitors),
    }
    this.renderRow = this.renderRow.bind(this);
    this.onActionSelected = this.onActionSelected.bind(this);
  }

  componentWillMount() {
    this.props.loadVisitors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visitors !== this.props.visitors) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.visitors),
      });
    }
  }

  render() {
    return (
      <View>
        <Icon.ToolbarAndroid
          navIconName='bars'
          style={styles.toolbar}
          onIconClicked={() => this.context.openDrawer()}
          actions={[{'title': 'Novo', iconName: 'plus', show: 'always'}]}
          onActionSelected={this.onActionSelected}
          title='Visitantes' />

        <Animatable.View animation='fadeIn' duration={300} style={styles.container}>
          <View style={styles.container}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderSeparator={(sectionID, rowID) => <View style={styles.separator} key={rowID} />} />
          </View>
        </Animatable.View>
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <View style={styles.rowContainer}>
        <Image source={{uri: rowData.photo._url}} style={styles.rowImage} />
        <View>
          <Text>{rowData.name}</Text>
          <Text style={{fontSize: 12}}>{rowData.rg}</Text>
        </View>
      </View>
    );
  }

  onActionSelected(actionIndex) {
    if (actionIndex === 0) {
      this.props.navigator.push({addOrEditVisitor: true});
    }
  }
}


VisitorsListingView.propTypes = {
  visitors: React.PropTypes.array,
  username: React.PropTypes.string,
  navigator: React.PropTypes.object,
}


VisitorsListingView.contextTypes = {
  openDrawer: React.PropTypes.func,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#eeeeee',
    height: 1,
  },
  rowImage: {
    marginRight: 15,
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  rowContainer: {
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
    visitors: state.visitors || [{ name: 'test', rg: '123456' }],
    username: state.user.username,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    loadVisitors: () => dispatch(loadVisitors()),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(VisitorsListingView);
