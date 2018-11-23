import React from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import Connector from '../Utils/Connector';
import { NavigationActions } from 'react-navigation';

import Loader from './Components/Loader';

import globalStyles from './Styles/Global';
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
        this.getLocation();
    }

    //This sets the title on the top header
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

    render () {
        if(this.state.latitude == null)
            return <Loader/>;

        //inside of return is jsx style code that will be rendered on the page
        return(
            <ScrollView contentContainerStyle={{flexGrow: 1}}
                        scrollEnabled={false}
                        keyboardShouldPersistTaps='handled'
                        style={globalStyles.background}>
                <KeyboardAvoidingView style={{flex:1, alignItems: 'center', justifyContent: 'center'}}
                                      behavior="padding">
                    <KeyboardAvoidingView style={{height: 100}}>
                        <Text style={styles.title}>
                            SwoleMate
                        </Text>
                    </KeyboardAvoidingView>
                    <TextInput
                        ref={input => { this.emailInput = input }}
                        placeholder='Email'
                        style={styles.textbox}
                        onChangeText={ (email) => this.setState({email})}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                    />

                    <View style={globalStyles.spacerSmall}/>

                    <TextInput
                        ref={input => { this.passwordInput = input }}
                        placeholder='Password'
                        style={styles.textbox}
                        onChangeText={ (password) => this.setState({password})}
                        autoCapitalize='none'
                        autoCorrect={false}
                        maxLength={15}
                        secureTextEntry={true}
                        textContentType='password'
                    />

                    <TouchableOpacity onPress={this.goToReset}>
                        <Text style={globalStyles.resetText}>Forgot Password</Text>
                    </TouchableOpacity>

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
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }

    goToReset = () => {
        this.props.navigation.navigate('Reset')
    };

    // login function (needs to be implemented)
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
                    'Profile'
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

    //register function (sends to RegisterScreen)
    register = () => {
        this.props.navigation.navigate('Register');
    };
}
