import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageInput from './ImageInput';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastAndroid from 'ToastAndroid';
import { saveVisitor } from '../actions';
import Toolbar from '../common/Toolbar';


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
    var form, title;
    if (this.props.visitor) {
      title = 'Editar Visitante';
    } else {
      title = 'Novo Visitante';
    }
    return (
      <View style={styles.container}>
        <Toolbar
          navIconName='arrow-left'
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

        <Spinner visible={this.state.saving} />
      </View>
    );
  }

  onActionSelected(actionIndex) {
    if (actionIndex === 0) { // save
      if (this.validateVisitor()) {
        this.setState({saving: true});

        const { name, rg, photo } = this.state;
        this.props.saveVisitor(name, rg, photo)
          .then(() => {
            ToastAndroid.show('Salvo', ToastAndroid.SHORT);
            this.props.navigator.pop();
          })
          .catch(() => {
            alert('Erro ao salvar, tente novamente.');
            this.setState({saving: false})
          })
      }
    }
  }

  validateVisitor() {
    if (!this.state.name) {
      alert('Nome obrigatório'); // TODO: replace alerts
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
