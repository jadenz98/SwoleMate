import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Connector from '../Utils/Connector';

//imports stylesheet for the LoginScreen
import styles from './Styles/LoginScreenStyles';

export default class LoginScreen extends React.Component {
    
    constructor(props){
        super(props);
        /*this is a state and are variables that may change. Calling setState() 
        can set the variable AND will rerender the component. I mostly see it
        done like this. Its possible to maybe use a normal variable*/
        this.state={
            username: '',
            password: '',
        }
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
                    placeholder='Username'
                    style={styles.textbox}
                    onChangeText={ (username) => this.setState({username})}
                />
                <TextInput 
                    placeholder='Password'
                    style={styles.textbox}
                    onChangeText={ (password) => this.setState({password})}
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

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Connector.get("/hello", {}, (response) => {
                            console.log(response);
                        });
                    }}
                >
                    <Text>
                        Test
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    //login function (needs to be implemented)
    login = () => {
        //sends alert to screen testing username and password are stored correctly (will eventually be taken out or commented out)
        alert('Username: ' + this.state.username + '\nPassword: ' + this.state.password);

        Connector.post("/login", {
            username: this.state.username,
            password: this.state.password
        }, {}, (response) => {
            console.log(response);
        });
    };

    //register function (needs to be implemented)
    register = () => {

    };
}