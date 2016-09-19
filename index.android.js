/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image
} from 'react-native';
import { Button } from 'react-native-material-design';
import TextField from 'react-native-md-textinput';

class ReactTest extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Image
          style={styles.logo}
          source={ require('./assets/logo.png') } />

        <TextField
          dense={true}
          label={'Name'}
          highlightColor={'#00BCD4'} />

        <TextField
          dense={true}
          label={'Email'}
          highlightColor={'#00BCD4'} />

        <Button text={'Entrar'}
                raised={true}
                onPress={() => alert("Go to home screen")} />

        <Button text={'Cadastrar-se'}
                onPress={() => alert("Go to signup screen")} />
      </View>
    );
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
  }
});

AppRegistry.registerComponent('ReactTest', () => ReactTest);
