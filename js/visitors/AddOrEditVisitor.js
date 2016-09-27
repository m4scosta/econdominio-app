import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageInput from './ImageInput';
import { saveVisitor } from '../actions';


class AddOrEditVisitor extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      rg: '',
      photo: null,
    }
    this.onActionSelected = this.onActionSelected.bind(this);
  }

  render() {
    var title, photo, button;
    if (this.props.visitor) {
      title = 'Editar Visitante';
    } else {
      title = 'Novo Visitante';
    }
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          navIconName='arrow-left'
          style={styles.toolbar}
          onIconClicked={() => this.props.navigator.pop()}
          actions={[{title: 'SALVAR', show: 'always'}]}
          onActionSelected={this.onActionSelected}
          title={title} />

        <View style={styles.formContainer}>

          <TextInput
            ref='rg'
            placeholder='Nome'
            onChangeText={(name) => this.setState({name})} />

          <TextInput
            ref='rg'
            placeholder='Nº da Carteira de Identidade'
            onChangeText={(rg) => this.setState({rg})} />

          <ImageInput
            onChangeImage={(photo) => this.setState({photo})} />
        </View>
      </View>
    );
  }

  onActionSelected(actionIndex) {
    if (actionIndex === 0) { // save
      if (this.validateVisitor()) {
        const { name, rg, photo } = this.state;
        this.props.saveVisitor(name, rg, photo)
          .then(() => this.props.navigator.pop())
          .catch(() => alert('Erro ao salvar, tente novamente.'));
      }
    }
  }

  validateVisitor() {
    if (!this.state.name) {
      alert('Nome obrigatório');
      return false;
    }
    if (!this.state.rg) {
      alert('Nº da Carteira de Identidade obrigatório');
      return false;
    }
    if (!this.state.photo) {
      alert('Foto do visitante obrigatória');
      return false;
    }
    return true;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 15,
  },
  toolbar: {
    backgroundColor: 'lightgray',
    height: 56,
  }
});


function mapDispatchToProps(dispatch) {
  return {
    saveVisitor: (name, rg, photo) => dispatch(saveVisitor(name, rg, photo)),
  };
}

export default connect(null, mapDispatchToProps)(AddOrEditVisitor);
