import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class OccurrenceTypeLabel extends Component {

  constructor(props) {
    super(props);
    this.props.textStyles = this.props.textStyles || {};
    this.labels = {
      'occurrence': 'Ocorrência',
      'complaint': 'Reclamação',
      'suggestion': 'Sugestão',
    }
  }

  render() {
    const typeLabel = this.labels[this.props.type];
    return (
      <Text style={[styles.smallText, this.props.textStyles]}>{typeLabel}</Text>
    );
  }
}


const styles = StyleSheet.create({
  smallText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  }
});
