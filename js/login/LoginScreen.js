import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard'
import Button from 'apsl-react-native-button'
import { login } from '../actions';


class LoginScreen extends Component {

  props: {
    loginFailed: boolean;
  }

  state: {
    username: ?string;
    password: ?string;
    isLoading: boolean;
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <ScrollView
              keyboardShouldPersistTaps={true}>
              <Image
                  style={styles.logo}
                  source={ require('../../assets/logo.png') } />

              <TextInput
                  autoCaptalize={'none'}
                  autoCorrect={false}
                  autoFocus={true}
                  returnKeyType={"next"}
                  placeholder={'E-mail'}
                  onChangeText={(username) => this.setState({username})}
                  onSubmitEditing={(event) => { this.refs.passwordInput.focus() }} />

              <TextInput
                  ref='passwordInput'
                  placeholder={'Senha'}
                  secureTextEntry={true}
                  onChangeText={(password) => this.setState({password})}
                  onSubmitEditing={(event) => { this.login() }} />

              <Button
                  style={styles.loginButton}
                  textStyle={{fontSize: 18, color: '#689F38'}}
                  isDisabled={this.state.isLoading}
                  isLoading={this.state.isLoading}
                  onPress={() => this.login() }>
                  ENTRAR
              </Button>

          </ScrollView>
      </View>
    );
  }

  login() {
    dismissKeyboard();
    var { username, password } = this.state;
    this.setState({ isLoading: true });
    const attempt = this.props.dispatch(login(username, password));
    attempt.catch((err) => this.handleLoginError(err));
  }

  handleLoginError(err) {
    console.warn(err);
    Alert.alert(
      'Falha ao entrar',
      'Verifique as credenciais fornecidas.',
      [
        { text: 'Ok', onClose: () => {} }
      ]
    );
    this.setState({ isLoading: false });
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  logo: {
    alignSelf: 'center'
  },
  loginButton: {
    marginTop: 10,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#689F38'
  }
});

function mapStateToProps(state) {
  return {
    loginFailed: state.user.loginFailed
  };
}

export default connect(mapStateToProps)(LoginScreen);
