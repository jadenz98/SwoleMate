import React from 'react';

import { Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

import CameraRollPicker from 'react-native-camera-roll-picker'


import Connector from '../Utils/Connector';

export default class PickPhoto extends React.Component{

    static navigationOptions = {
        title: 'Pick Photo',
    };

    getSelectedImages(image){
        
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <CameraRollPicker callback={this.getSelectedImages} maximum={1}/>
            </View>
        );
    }
}
