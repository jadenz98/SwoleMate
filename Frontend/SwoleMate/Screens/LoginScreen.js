import React from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import Connector from '../Utils/Connector';
import { NavigationActions } from 'react-navigation';

import Loader from './Components/Loader';
import Expo from 'expo';
import globalStyles from './Styles/Global';
import styles from './Styles/LoginScreenStyles';

import api from '../config/api';

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
        this.getLocation();
    }

    //This sets any options for the header navigation bar
    static navigationOptions = {
        title: 'Login',
    };

    getLocation(){
        //get user's location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                });
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    fbLogin = async () => {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(api.fbClientId, {permissions: [ 'public_profile', 'email', 'user_friends']});

        if(type === 'success'){
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture,birthday`
            );
            
            const loginInfo = await response.json();
            this.setState({
                email: loginInfo.email,
                password: 'Facebook',
            });
            this.login();
            console.log(loginInfo);
        }
        else {
            console.error(type);
        }
    };

    googleLogin = async () => {
        const result = await Expo.Google.logInAsync({
            androidClientId: api.googleClientIDAndroid,
            iosClientId: api.googleClientIdIOS,
            scopes: ['profile', 'email'],

        });

        if(result.type === 'success'){
            this.setState({
                email: result.user.email,
                password: 'Google',
            });
            this.login();
            console.log(result);
        }
        else{
            console.log('Cancelled');
        }
    };

    render () {
        //if latitude has not been set, a loader screen will appear until it is
        if(this.state.latitude == null)
            return <Loader/>;

        //inside of return is jsx style code that will be rendered on the page
        return(
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                scrollEnabled={false}
                keyboardShouldPersistTaps='handled'
                style={globalStyles.background}
            >
                <KeyboardAvoidingView
                    style={{flex:1, alignItems: 'center', justifyContent: 'center'}}
                    behavior="padding"
                >
                    <KeyboardAvoidingView style={{height: 100}}>
                        <Text style={styles.title}>
                            SwoleMate
                        </Text>
                    </KeyboardAvoidingView>

                    <TextInput
                        placeholder='Email'
                        style={globalStyles.inputBox}
                        onChangeText={ (email) => this.setState({email})}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                    />

                    <View style={globalStyles.spacerSmall}/>

                    <TextInput
                        placeholder='Password'
                        style={globalStyles.inputBox}
                        onChangeText={ (password) => this.setState({password})}
                        autoCapitalize='none'
                        autoCorrect={false}
                        maxLength={15}
                        secureTextEntry={true}
                        textContentType='password'
                        ref={input => { this.passwordInput = input }}
                    />

                    <TouchableOpacity onPress={this.goToReset}>
                        <Text style={globalStyles.resetText}>Forgot Password</Text>
                    </TouchableOpacity>

                    {/*TouchableOpacity will be used as a button because it is more customizable and can funtion the same.
                    This is the login button
                    onPress tells the button what do do when pressed (here it calls the login function defined below)*/}

                    <View style={globalStyles.spacer}/>

                    <TouchableOpacity style={globalStyles.btnPrimary} onPress={this.login}>
                        <Text style={globalStyles.btnText}>
                            Login
                        </Text>
                    </TouchableOpacity>

                    {/*This is the Register button*/}
                    <TouchableOpacity style={globalStyles.btn} onPress={this.register}>
                        <Text style={globalStyles.btnTextBlack}>
                            Register
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.btnSecondary} onPress={this.fbLogin}>
                        <Text style={globalStyles.btnText}>
                            Login with Facebook
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.btnSecondary} onPress={this.googleLogin}>
                        <Text style={globalStyles.btnText}>
                            Login with Google
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
          </ScrollView>
        );
    }

    //takes user to resetPassword page
    goToReset = () => {
        this.props.navigation.navigate('Reset')
    };

    //logs in the user with provided credentials via the TextInputs
    login = () => {
        Connector.post("/user/login", {
            email: this.state.email,
            password: this.state.password
        }, {}, (response) => {
            console.log(response.success);
            if(response.success){ //Server returned success on login
                
                //object to pass user info to next screen
                const userInfo = {
                    email: this.state.email
                };

                //sends the users current location to the server
                Connector.post("/user/updateLocation",
                    {
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                    },
                    {
                        email: this.state.email
                    }, (response) => {
                        console.log(response);
                    }
                );

                const screensToPassInfoTo = [
                    'Home',
                    'Matches',
                    'Profile',
                    'Calendar'
                ];

                for (let i = 0; i < screensToPassInfoTo.length; i++){
                    const setParamsAction = NavigationActions.setParams({
                        params: userInfo,
                        key: screensToPassInfoTo[i]
                    });
                    this.props.navigation.dangerouslyGetParent().dispatch(setParamsAction);
                }

                this.props.navigation.navigate('Home');
            } else { //Server returned failure on login
                this.passwordInput.clear();
                alert('Login information was incorrect');
            }
        });
    };

    //takes user to register screen
    register = () => {
        this.props.navigation.navigate('Register');
    };
}
