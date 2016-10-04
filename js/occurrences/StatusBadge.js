import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class StatusBadge extends Component {

  constructor(props) {
    super(props);
    this.labels = {
      'waiting': 'Aguardando',
      'done': 'Concluído',
      'occurrence': 'Ocorrência',
      'complaint': 'Reclamação',
      'suggestion': 'Sugestão',
    }
  }

  render() {
    const statusLabel = this.labels[this.props.status];
    const containerColor = this.props.status === 'done' ? 'blue' : 'orange';
    const textColor = this.props.status === 'done' ? 'white' : 'black';
    return (
      <Text style={[styles.statusContainer, styles.smallText, {color: textColor, backgroundColor: containerColor}]}>{statusLabel}</Text>
    );
  }
}


const styles = StyleSheet.create({
  statusContainer: {
    height: 20,
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    overflow: 'hidden',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
  }
});
