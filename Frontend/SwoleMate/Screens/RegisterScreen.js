import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Connector from '../Utils/Connector'

//import stylesheet
import styles from './Styles/LoginScreenStyles';

export default class RegisterScreen extends React.Component{
    constructor(props){
      super(props);
      this.state={
        newUsername: '',
        newPassword: '',
        email: '',
      }
    }
    //This sets the title on the top header
    static navigationOptions = {
        title: 'Register',
    };

    render(){
        return(
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
              Register new Swolemate account here
            </Text>

            <TextInput
              placeholder='Username'
              style={styles.textbox}
              onChangeText={ (newUsername) => this.setState({newUsername})}
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='username'
            />

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
              onChangeText={ (newPassword) => this.setState({newPassword})}
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={15}
              secureTextEntry={true}
              textContentType='password'
            />

            <TextInput
              placeholder='Confirm Password'
              style={styles.textbox}
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={15}
              secureTextEntry={true}
              textContentType='password'
            />

            <TouchableOpacity style={styles.button} onPress={this.registerAccount}>
              <Text>
                Register Account
              </Text>
            </TouchableOpacity>
          </View>
        )
    }

    //register function
    registerAccount = () => {
      alert('Username: ' + this.state.newUsername + '\nPassword: ' + this.state.newPassword);
    };
}
