import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

//imports stylesheet for the LoginScreen
import styles from './Styles/LoginScreenStyles';

export default class LoginScreen extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
        }
    }
    //This sets the title on the top header
    static navigationOptions = {
        title: 'Login',
    };
    render(){
        //inside of return is jsx style code that will be rendered on the page
        return(
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput 
                    placeholder='Username'
                    style={styles.textbox}
                />
                <TextInput 
                    placeholder='Password'
                    style={styles.textbox}
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

    //login function (needs to be implemented)
    login = () =>{

    }

    //register function (needs to be implementd)
    register = () =>{

    }
}