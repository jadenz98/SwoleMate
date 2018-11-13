import React from 'react';
import {TouchableOpacity, Text, TextInput, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import Connector from '../Utils/Connector'

import Loader from './Components/Loader';

import styles from './Styles/LoginScreenStyles';
import globalStyles from './Styles/Global';

export default class  resetConfirmation extends React.Component {
    constructor(props) {
      super(props);
    }

    static navigationOptions = {
        title: 'Reset Password',
    };

    render () {
      return(
        <ScrollView contentContainerStyle={{flexGrow: 1}}
                    scrollEnabled={false}
                    keyboardShouldPersistTaps='handled'>
          <KeyboardAvoidingView style={{flex:1, alignItems: 'center', justifyContent: 'center'}}
                                behavior="padding">
              <Text>An email was successfully sent</Text>
              <TouchableOpacity onPress={this.goToLogin}>
                <Text style={globalStyles.resetTexts}>
                  Login
                </Text>
              </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
      );
    }

    goToLogin = () => {
      this.props.navigation.navigate('Login');
    };
}
