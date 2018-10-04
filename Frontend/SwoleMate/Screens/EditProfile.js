import React from 'react';
import {View, Text, Modal, TouchableHighlight } from 'react-native';
import SelectMultiple from 'react-native-select-multiple'

const interests = ['Biking', 'Running', 'Swimming']

export default class EditProfile extends React.Component{

    state = {
        selectedInterests: [],
        modalVisible: false,
    }
        //This sets the title on the top header
        static navigationOptions = {
            title: 'Edit',
        };
    
    render(){
        return(
            <View style={{marginTop: 10}}>
                <Modal 
                    transparent={false} 
                    visible={this.state.modalVisible}>
                    <View style={{marginTop: 22}}>
                        <SelectMultiple
                            items={interests}
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
            </View>
        );
    }

    onSelectionsChange = (selectedInterests) => {
        this.setState({ selectedInterests });
    }

    setModalVisibility(visible) {
        this.setState({ modalVisible: visible});
    }
}