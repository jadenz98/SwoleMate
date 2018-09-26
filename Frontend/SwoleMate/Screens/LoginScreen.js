import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Connector from '../Utils/Connector';

//imports stylesheet for the LoginScreen
import styles from './Styles/LoginScreenStyles';

export default class LoginScreen extends React.Component {
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
                />
                <TextInput 
                    placeholder='Password'
                    style={styles.textbox}
                />
                {/*TouchableOpacity will be used as a button because it is more customizable and can funtion the same*/}
                <TouchableOpacity style={styles.button}>
                    <Text>
                        Login
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
}