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
            username: '',
            password: '',
            latitude: null,
            longitude: null,
            error: null,
        }
        this.getLocation();
    }

    //Function to get user's location
    getLocation(){
      //alert('getLocation');
      //get user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
      //alert('Lat: ' + this.state.latitude + '\nLong: ' + this.state.longitude + '\nError: ' + this.state.error);
    }

    //This sets the title on the top header
    static navigationOptions = {
        title: 'Login',
    };

    render () {
      if (this.state.latitude == null) return null;
        //inside of return is jsx style code that will be rendered on the page
        return(
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                    placeholder='Username'
                    style={styles.textbox}
                    onChangeText={ (username) => this.setState({username})}
                    autoCapitalize='none'
                    autoCorrect={false}
                    textContentType='username'
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

        Connector.post("/login", {
            username: this.state.username,
            password: this.state.password
        }, {}, (response) => {
            console.log(response);
        });

        //object to pass user info to next screen
        var userinfo = {
            username: this.state.username,
        }

        //get user's location
        /*navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => this.setState({error: error.message }),
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );*/

        alert('Lat: ' + this.state.latitude + '\nLong: ' + this.state.longitude + '\nError: ' + this.state.error);
        this.props.navigation.navigate('Home',userinfo);
    };

    //register function (sends to RegisterScreen)
    register = () => {
        this.props.navigation.navigate('Register')
    };
}
