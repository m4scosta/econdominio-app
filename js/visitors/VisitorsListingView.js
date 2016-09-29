import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  ListView,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { loadVisitors, deleteVisitor } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastAndroid from 'ToastAndroid';


class VisitorsListingView extends Component {

  constructor(props, context) {
    super(props, context);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.visitors),
      loading: false,
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
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          navIconName='bars'
          style={styles.toolbar}
          onIconClicked={() => this.context.openDrawer()}
          actions={[{'title': 'Novo', iconName: 'plus', show: 'always'}]}
          onActionSelected={this.onActionSelected}
          title='Visitantes' />

        <Animatable.View animation='fadeIn' duration={300} style={styles.container}>
          <ScrollView>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderSeparator={(sectionID, rowID) => <View style={styles.separator} key={rowID} />} />
          </ScrollView>
        </Animatable.View>

        <Spinner visible={this.state.loading} />
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
        <View style={{flex: 1, alignItems: 'flex-end', paddingTop: 15}}>
          <Icon
            name='trash'
            size={20}
            color='indianred'
            onPress={this.handleDeletePress.bind(this, rowData.id)}/>
        </View>
      </View>
    );
  }

  handleDeletePress(visitorId) {
    this.setState({loading: true});
    this.props.deleteVisitor(visitorId)
      .then(() => {
        ToastAndroid.show('Apagado', ToastAndroid.SHORT)
        this.setState({loading: false});
      })
      .catch(() => {
        alert('Não foi possível apagar o visitante, verifique sua conexão com a internet e tente novamente.');
        this.setState({loading: false});
      });
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
    deleteVisitor: (visitorId) => dispatch(deleteVisitor(visitorId))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(VisitorsListingView);
