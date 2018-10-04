import React from 'react';
import styles from "./Styles/LoginScreenStyles";

import { Text, View, TextInput, TouchableOpacity, Picker } from 'react-native';

import Connector from '../Utils/Connector';

export default class EditProfile extends React.Component{

    constructor (props) {
        super(props);

        this.state = {};

        Connector.get('/user', {username: 'sam'}, (res) => {
           this.setState({user: res});
           console.log(res);
        });
    }

    //This sets the title on the top header
    static navigationOptions = {
        title: 'Edit',
    };
    
    render () {

        if (this.state.user == null)
            return null;

        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                    value = {this.state.user.username}
                    placeholder='Username'
                    style={styles.textbox}
                    onChangeText={(username) => this.setState({user: {username: username}})}
                    autoCapitalize='none'
                    autoCorrect={false}
                    textContentType='username'
                />

                <TextInput
                    value = {this.state.user.name}
                    placeholder='Name'
                    style={styles.textbox}
                    onChangeText={(name) => this.setState({user: {name: name}})}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <TextInput
                    value = {this.state.user.email}
                    placeholder='Email'
                    style={styles.textbox}
                    onChangeText={(email) => this.setState({user: {email: email}})}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <TextInput
                    placeholder='Birthday (mm/dd/yyyy)'
                    style={styles.textbox}
                    onChangeText={ (birthday) => this.setState({user: {birthday}})}
                    keyboardType='decimal-pad'
                    maxLength={10}
                />

                <TextInput
                    placeholder='Phone Number'
                    style={styles.textbox}
                    onChangeText={ (phone_number) => this.setState({user: {phone_number}})}
                    keyboardType='phone-pad'
                />

                <Picker
                    selectedValue={this.state.user.sex}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({user: {sex: itemValue}})}>
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Prefer not to specify" value="not_specified" />
                </Picker>

                <TouchableOpacity style={styles.button} onPress={this.save}>
                    <Text>
                        Save
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.register}>
                    <Text>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}