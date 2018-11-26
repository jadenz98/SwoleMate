import React from 'react';

import { ImageEditor, ImageStore, Text, View, TouchableOpacity, } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker'

import Connector from '../Utils/Connector';

export default class PickPhoto extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            photos: [],
            user: null,
            smallerPhotoUri: null,
        };
        Connector.get('/user', {email: props.navigation.dangerouslyGetParent().getParam('email')}, (res) => {
            this.setState({user: res});
        });
    }

    static navigationOptions = {
        title: 'Pick Photo',
    };

    getSelectedImages = (image) =>{
        console.log(image);
        if (typeof image != 'undefined'){
            this.setState({photos: image});
        }
    };

    save = () => {
        let photo = {};

        const cropData = {
            offset: {x: 0, y: 0},
            size: {
                width: this.state.photos[0].width,
                height: this.state.photos[0].height,
            },
            displaySize: {
                width: ((this.state.photos[0].width)),
                height: ((this.state.photos[0].height))
            }
        };

        ImageEditor.cropImage(this.state.photos[0].uri, cropData, success => { 
            ImageStore.getBase64ForTag(success, base64Success =>
                {
                    photo.photoData = base64Success;
                    console.log(photo.photoData);
                    photo.photoWidth = cropData.displaySize.width;
                    photo.photoHeight = cropData.displaySize.height;
                    const user= this.state.user;
                    Connector.post('/user/update', photo, {email: user.email}, () => {
                        this.props.navigation.pop();
                    }
                    );
                    
                }, base64Failure => {console.log(base64Failure)});
        }, failure => { console.log(failure)});
    };

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
