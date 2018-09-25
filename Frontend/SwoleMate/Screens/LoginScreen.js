import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };
    render(){
        return(
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput placeholder='Username'/>
                <TextInput placeholder='Password'/>
                <TouchableOpacity style={{alignItems: 'center', padding: 5, backgroundColor: '#F9F9F9'}}>
                    <Text >
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}