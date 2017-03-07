import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Picker,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import StatusBadge from './StatusBadge';
import OccurrenceTypeLabel from './OccurrenceTypeLabel';
import Toolbar from '../common/Toolbar';


class OccurrenceDetailView extends Component {

  constructor(props) {
    super(props);
    this.occurrence = this.props.occurrence;
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          navIconName='arrow-left'
          onIconClicked={() => this.props.navigator.pop()}
          actions={[{title: 'EDITAR', show: 'always'}]}
          onActionSelected={(idx) => this.onActionSelected(idx)}
          title='Detalhes da Ocorrência' />

          {this.renderContent()}

      </View>
    );
  }

  renderContent() {
    var answer = '';
    if (this.occurrence.status === 'waiting') {
      answer = 'Ocorrência ainda aguardando resposta.';
    }
    return (
      <View style={styles.contentContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={[{flex: 5}]}>
            <OccurrenceTypeLabel type={this.occurrence.type} textStyles={styles.headerText} />
          </View>
          <View style={{flex: 2}}>
            <StatusBadge status={this.occurrence.status} />
          </View>
        </View>
        <View>
          <Text style={styles.label}>Título</Text>
          <Text style={styles.normalText}>{this.occurrence.title}</Text>

          <Text style={styles.label}>Resposta</Text>
          <Text style={styles.normalText}>{answer}</Text>
        </View>
      </View>
    );
  }

  onActionSelected(actionIndex) {
    if (actionIndex === 0) {
      this.props.navigator.push({
        addOccurrence: true,
        occurrence: this.props.occurrence,
      });
    }
  }
}

// 39661934

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'lightgray',
    height: 56,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  headerText: {
    fontSize: 20,
  },
  normalText: {
    fontSize: 17,
  },
  smallText: {
    fontSize: 15
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
});


export default OccurrenceDetailView;
