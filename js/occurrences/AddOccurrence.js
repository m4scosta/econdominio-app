import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Picker,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastAndroid from 'ToastAndroid';
import { saveOccurrence } from '../actions';
import Toolbar from '../common/Toolbar';


class AddOccurrence extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      title: '',
      type: 'occurrence',
    }
    if (this.props.occurrence) {
      this.state = {...this.props.occurrence};
    }
    this.onActionSelected = this.onActionSelected.bind(this);
  }

  render() {
    var form, title;
    if (this.props.occurrence) {
      title = 'Editar Ocorrência';
    } else {
      title = 'Nova Ocorrência';
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
              value={this.state.title}
              ref='title'
              placeholder='Título'
              onChangeText={(title) => this.setState({title})} />

            <View style={styles.inlineInputContainer}>
              <Text style={[styles.inline, styles.inlineLabel]}>Tipo:</Text>

              <Picker
                style={[styles.inline, styles.inlineInput, {marginTop: 15}]}
                mode='dropdown'
                selectedValue={this.state.type}
                onValueChange={(type) => this.setState({type})}>
                <Picker.Item label='Ocorrência' value='occurrence' />
                <Picker.Item label='Sugestão' value='suggestion' />
                <Picker.Item label='Reclamação' value='complaint' />
              </Picker>

            </View>

          </View>

        <Spinner visible={this.state.saving} />
      </View>
    );
  }

  onActionSelected(actionIndex) {
    if (actionIndex === 0) { // save
      if (this.validateVisitor()) {
        this.setState({saving: true});
        this.props.saveOccurrence({...this.state})
          .then(() => {
            ToastAndroid.show('Salvo', ToastAndroid.SHORT);
            if (!this.state.id) {
              this.props.navigator.popN(1);
            } else {
              this.props.navigator.popN(2);
            }
          })
          .catch((err) => {
            alert('Erro ao salvar, tente novamente.');
            console.log(err);
            this.setState({saving: false})
          })
      }
    }
  }

  validateVisitor() {
    if (!this.state.title) {
      alert('Título obrigatório'); // TODO: replace alerts
      return false;
    }
    if (!this.state.type) {
      alert('Tipo obrigatório');
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
  },
  inlineInputContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row'
  },
  inline: {
    flex: 1,
    alignSelf: 'center',
  },
  inlineInput: {
    flex: 3,
  },
  inlineLabel: {
    flex: 1,
  },
});


function mapDispatchToProps(dispatch) {
  return {
    saveOccurrence: (title, type) => dispatch(saveOccurrence(title, type)),
  };
}

export default connect(null, mapDispatchToProps)(AddOccurrence);
