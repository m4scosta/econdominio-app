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
import { logout, login } from './actions';
import { bindActionCreators } from 'redux';


class App extends Component {

    render() {
        return (
            <LoginScreen {...this.props} />
        );
    }
}


class LoginScreen extends Component {

    render() {
        var actionButton;
        console.log(this);
        if (!this.props.isLoggedIn) {
            actionButton = (
                <Button
                    text={'ENTRAR'}
                    raised={true}
                    onPress={() => this.props.login() } />
            );
        } else {
            actionButton = (
                <Button
                    text={'CADASTRAR-SE'}
                    onPress={ () => this.props.logout() } />
            );
        }
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
                    {actionButton}
                </ScrollView>
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


function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}


function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
        login: () => dispatch(login())
    }
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
