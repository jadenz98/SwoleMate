import React from 'react';

import { Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

import CameraRollPicker from 'react-native-camera-roll-picker'


import Connector from '../Utils/Connector';

export default class PickPhoto extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            photo: null
        }
    }

    static navigationOptions = {
        title: 'Pick Photo',
    };

    getSelectedImages = (image) =>{
        //image is an array of image object
        //the state photo is set to the image object including the uri
        this.setState({photo: image[0]});
    }

    save = () => {
    
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={this.save}>
                    <Text>
                        Save Picture
                    </Text>
                </TouchableOpacity>
                <CameraRollPicker callback={this.getSelectedImages} maximum={1}/>
            </View>
        );
    }
}
