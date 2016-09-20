// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Image
} from 'react-native';
import { Button } from 'react-native-material-design';
import TextField from 'react-native-md-textinput';
import { togglePush } from './actions';
import { bindActionCreators } from 'redux';


class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
              style={styles.logo}
              source={ require('../assets/logo.png') } />

          <TextField
              dense={true}
              label={'Name'}
              highlightColor={'#00BCD4'} />

          <TextField
              dense={true}
              label={'Email'}
              highlightColor={'#00BCD4'} />

          <Button
              text={'Entrar'}
              raised={true}
              onPress={() => alert("Go to home screen")} />

          <Button
              text={'Cadastrar-se'}
              onPress={() => alert("Go to signup screen")} />

          <Button
              text={'TOGGLE'}
              raised={this.props.allowPush}
              onPress={ () => this.props.dispatch(togglePush(false)) } />

        </ScrollView>
      </View>
    );
  }
}


// class LoginScreen extends Component {
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           <Image
//               style={styles.logo}
//               source={ require('../assets/logo.png') } />
//
//           <TextField
//               dense={true}
//               label={'Name'}
//               highlightColor={'#00BCD4'} />
//
//           <TextField
//               dense={true}
//               label={'Email'}
//               highlightColor={'#00BCD4'} />
//
//           <Button
//               text={'Entrar'}
//               raised={true}
//               onPress={() => alert("Go to home screen")} />
//
//           <Button
//               text={'Cadastrar-se'}
//               onPress={() => alert("Go to signup screen")} />
//
//           <Button
//               text={'TOGGLE'}
//               raised={this.props.allowPush}
//               onPress={() => this.props.dispatch(togglePush(!this.props.allowPush)) } />
//         </ScrollView>
//       </View>
//     );
//   }
// }


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


function mapStateToProps(state) {
  return {
    allowPush: state.allowPush
  };
}

export const AppContainer = connect(mapStateToProps, null, null, { pure: false })(App);
