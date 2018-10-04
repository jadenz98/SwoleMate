import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Connector from '../Utils/Connector';

//imports stylesheet for the LoginScreen
import styles from './Styles/LoginScreenStyles';

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);

        /*
            This is a state and are variables that may change. Calling setState()
            can set the variable AND will rerender the component. I mostly see it
            done like this. Its possible to maybe use a normal variable
        */
        this.state={
            email: '',
            password: '',
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    //This sets the title on the top header
    static navigationOptions = {
        title: 'Login',
    };

    render () {
        //inside of return is jsx style code that will be rendered on the page
        return(
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                    placeholder='Email'
                    style={styles.textbox}
                    onChangeText={ (email) => this.setState({email})}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                />

                <TextInput
                    placeholder='Password'
                    style={styles.textbox}
                    onChangeText={ (password) => this.setState({password})}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={15}
                    secureTextEntry={true}
                    textContentType='password'
                />

                {/*TouchableOpacity will be used as a button because it is more customizable and can funtion the same.
                This is the login button
                onPress tells the button what do do when pressed (here it calls the login function defined below)*/}
                <TouchableOpacity style={styles.button} onPress={this.login}>
                    <Text>
                        Login
                    </Text>
                </TouchableOpacity>

                {/*This is the Register button*/}
                <TouchableOpacity style={styles.button} onPress={this.register}>
                    <Text>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    // login function (needs to be implemented)
    login = () => {
        //sends alert to screen testing username and password are stored correctly (will eventually be taken out or commented out)
        //alert('Username: ' + this.state.username + '\nPassword: ' + this.state.password);

        Connector.post("/user/login", {
            email: this.state.email,
            password: this.state.password
        }, {}, (response) => {
            console.log(response);
        });

        //object to pass user info to next screen
        var userinfo = {
            email: this.state.email,
            interests: [],
        };

        Connector.post("/updateLocation", {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
        {
          username: this.state.email
        }
      );

        alert('Lat: ' + this.state.latitude + '\nLong: ' + this.state.longitude + '\nError: ' + this.state.error);
        this.props.navigation.navigate('Home',userinfo);
    };

    //register function (sends to RegisterScreen)
    register = () => {
        this.props.navigation.navigate('Register')
    };
}
