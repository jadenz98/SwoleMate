import React from 'react';

import AssetUtils from 'expo-asset-utils';

import { ImageStore, Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

import CameraRollPicker from 'react-native-camera-roll-picker'


import Connector from '../Utils/Connector';

export default class PickPhoto extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            photos: [],
        }
    }

    static navigationOptions = {
        title: 'Pick Photo',
    };

    getSelectedImages = (image) =>{
        if (typeof image != 'undefined'){
            this.setState({photos: image});
        }
        
        /*AssetUtils.base64forImageUriAsync(image[0].uri)
            .then(base64data => {
                console.log(base64data)
            });

            */

        //image is an array of image object
        //the state photo is set to the image object including the uri
    }

    save = () => {
        base64Photos = [];
        console.log("photos length:" + this.state.photos.length);
        for(i=0;i<this.state.photos.length;i++){
        AssetUtils.base64forImageUriAsync(this.state.photos[i].uri)
        .then(base64data => {
            base64Photos[i]=base64data;
            //console.log(base64data.size)
            //console.log(base64Photos[i]);
        });
        }
        
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
