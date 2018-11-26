import React from 'react';
import { TouchableOpacity, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import Connector from '../Utils/Connector';

import globalStyles from './Styles/Global';

export default class ResetScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
        };
    }

    static navigationOptions = {
        title: 'Reset Password',
    };

    render () {
        return (
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                scrollEnabled={false}
                keyboardShouldPersistTaps='handled'
            >
                <KeyboardAvoidingView
                    style={{flex:1, alignItems: 'center', justifyContent: 'center'}}
                    behavior="padding"
                >
                    <TextInput
                        ref={input => {this.emailInput = input }}
                        placeholder='Email'
                        style={globalStyles.inputBox}
                        onChangeText={ (email) => this.setState({email})}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                    />

                    <TouchableOpacity style={globalStyles.btnPrimary} onPress={this.resetPassword}>
                        <Text style={globalStyles.btnText}>
                            Send Reset Email
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }

    resetPassword = () => {
        Connector.post("/user/recoverPassword", {
            email: this.state.email
        }, {}, (response) => {
            if (response.success) {
                this.emailInput.clear();
                this.props.navigation.navigate('ResetConfirm');
            } else {
                this.emailInput.clear();
                alert('Email is not valid');
            }
        });
    };
}
