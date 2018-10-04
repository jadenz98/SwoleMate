import React from 'react';
import styles from "./Styles/LoginScreenStyles";

import { Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

import Connector from '../Utils/Connector';

export default class EditProfile extends React.Component {
    interests = ['Biking', 'Running', 'Swimming'];

    constructor(props) {
        super(props);

        this.state = {
            selectedInterests: [],
            modalVisible: false,
        };

        Connector.get('/user', {username: 'sam'}, (res) => {
            this.setState({user: res});
            console.log(res);
        });
    }

    //This sets the title on the top header
    static navigationOptions = {
        title: 'Edit',
    };

    onSelectionsChange = (selectedInterests) => {
        this.setState({selectedInterests});
    };

    setModalVisibility(visible) {
        this.setState({modalVisible: visible});
    }

    render() {

        if (this.state.user == null)
            return null;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                    value={this.state.user.username}
                    placeholder='Username'
                    style={styles.textbox}
                    onChangeText={(username) => this.setState({user: {username: username}})}
                    autoCapitalize='none'
                    autoCorrect={false}
                    textContentType='username'
                />

                <TextInput
                    value={this.state.user.name}
                    placeholder='Name'
                    style={styles.textbox}
                    onChangeText={(name) => this.setState({user: {name: name}})}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <TextInput
                    value={this.state.user.email}
                    placeholder='Email'
                    style={styles.textbox}
                    onChangeText={(email) => this.setState({user: {email: email}})}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <TextInput
                    placeholder='Birthday (mm/dd/yyyy)'
                    style={styles.textbox}
                    onChangeText={(birthday) => this.setState({user: {birthday}})}
                    keyboardType='decimal-pad'
                    maxLength={10}
                />

                <TextInput
                    placeholder='Phone Number'
                    style={styles.textbox}
                    onChangeText={(phone_number) => this.setState({user: {phone_number}})}
                    keyboardType='phone-pad'
                />

                <Picker
                    selectedValue={this.state.user.sex}
                    style={{height: 50, width: 150}}
                    onValueChange={(itemValue, itemIndex) => this.setState({user: {sex: itemValue}})}>
                    <Picker.Item label="Male" value="male"/>
                    <Picker.Item label="Female" value="female"/>
                    <Picker.Item label="Prefer not to specify" value="not_specified"/>
                </Picker>

                <Modal
                    transparent={false}
                    visible={this.state.modalVisible}>
                    <View style={{marginTop: 22}}>
                        <SelectMultiple
                            items={this.interests}
                            selectedItems={this.state.selectedInterests}
                            onSelectionsChange={this.onSelectionsChange}
                        />
                        <TouchableHighlight
                            onPress={() => {
                                this.setModalVisibility(!this.state.modalVisible);
                            }}>
                            <Text>Hide Interests</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisibility(true);
                    }}>
                    <Text>Show Interests</Text>
                </TouchableHighlight>

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