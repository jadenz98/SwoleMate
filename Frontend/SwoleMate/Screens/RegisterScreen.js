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
            />

            <TextInput
              placeholder='Password'
              style={styles.textbox}
              onChangeText={ (newPassword) => this.setState({newPassword})}
              autoCapitalize='none'
              maxLength={15}
            />

            <TextInput
              placeholder='Confirm Password'
              style={styles.textbox}
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
