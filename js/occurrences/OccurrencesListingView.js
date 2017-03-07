import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  ListView,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import TouchableWithoutFeedback from 'TouchableWithoutFeedback';
import { loadOccurrences, deleteOccurrence } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastAndroid from 'ToastAndroid';
import StatusBadge from './StatusBadge';
import OccurrenceTypeLabel from './OccurrenceTypeLabel';
import Toolbar from '../common/Toolbar';


class OccurrencesListingView extends Component {

  constructor(props, context) {
    super(props, context);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.occurrences),
      loading: false,
    }
    this.labels = {
      'occurrence': 'Ocorrência',
      'complaint': 'Reclamação',
      'suggestion': 'Sugestão',
    };
    this.renderRow = this.renderRow.bind(this);
    this.onActionSelected = this.onActionSelected.bind(this);
  }

  componentWillMount() {
    this.props.loadOccurrences();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.occurrences !== this.props.occurrences) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.occurrences),
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          actions={[{'title': 'Novo', iconName: 'plus', show: 'always'}]}
          onActionSelected={this.onActionSelected}
          title='Ocorrências' />

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
    const icon = this.renderRowIcon(rowData);

    return (
      <TouchableHighlight onPress={() => this.props.navigator.push({occurrenceDetail: true, occurrence: rowData})}>
        <View style={styles.rowContainer}>
          {icon}
          <View style={{flex: 2, alignSelf: 'stretch'}}>
            <OccurrenceTypeLabel type={rowData.type} />
            <Text style={styles.normalText}>{rowData.title}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', paddingTop: 10}}>
            <StatusBadge status={rowData.status} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderRowIcon(rowData) {
    var iconName;
    var customStyles = {};
    if (rowData.type === 'occurrence') {
      iconName = 'pencil-square-o';
      customStyles = { color: 'orange' }
    }
    if (rowData.type === 'suggestion') {
      iconName = 'lightbulb-o';
      customStyles = { color: 'lightblue' }
    }
    if (rowData.type === 'complaint') {
      iconName = 'exclamation-triangle';
      customStyles = { color: 'red' }
    }
    return (
      <Icon
        name={iconName}
        style={[styles.rowIcon, customStyles]}
        size={20} />
    );
  }

  renderStatusBadge(rowData) {
    const statusLabel = this.labels[rowData.status];
    const containerColor = rowData.status === 'done' ? 'blue' : 'orange';
    const textColor = rowData.status === 'done' ? 'white' : 'black';
    return (
      <View style={[styles.statusContainer, {backgroundColor: containerColor}]}>
        <Text style={[styles.smallText, {color: textColor}]}>{statusLabel}</Text>
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
      this.props.navigator.push({addOccurrence: true});
    }
  }
}


OccurrencesListingView.propTypes = {
  occurrences: React.PropTypes.array,
  username: React.PropTypes.string,
  navigator: React.PropTypes.object,
}


OccurrencesListingView.contextTypes = {
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
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  rowIcon: {
    marginRight: 15,
    alignSelf: 'center',
    width: 20,
    height: 20,
  },
  statusContainer: {
    height: 20,
    borderRadius: 10,
    paddingRight: 5,
    paddingLeft: 5,
    overflow: 'hidden'
  },
  normalText: {
    fontSize: 15,
  },
  smallText: {
    fontSize: 12,
  },
  toolbar: {
    backgroundColor: 'lightgray',
    height: 56,
  },
});


function mapStateToProps(state) {
  return {
    occurrences: state.occurrences || [],
    username: state.user.username,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    loadOccurrences: () => dispatch(loadOccurrences()),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(OccurrencesListingView);
