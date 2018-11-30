import React from 'react';

import { ImageEditor, ImageStore, Text, View, TouchableOpacity, } from 'react-native';

import Expo from 'expo';

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
        //this.requestExternalStoragePermission();
    }

    /*requestExternalStoragePermission = async () => {
        const { Location, Permissions } = Expo;
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            return Location.getCurrentPositionAsync({enableHighAccuracy: true});
        } else {
            throw new Error('Location permission not granted');
        }
    }*/

    static navigationOptions = {
        title: 'Pick Photo',
    };

    //callback for cameraRollPicker that takes the selected images (as image objects) as the parameters 
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
            //size of the original image
            size: {
                width: this.state.photos[0].width,
                height: this.state.photos[0].height,
            },
            //desired size of the cropped image
            displaySize: {
                width: ((this.state.photos[0].width)/7),
                height: ((this.state.photos[0].height)/7)
            }
        };

        //crops image according to cropData above
        ImageEditor.cropImage(this.state.photos[0].uri, cropData, success => { 
            //provides a base64 string of the image
            ImageStore.getBase64ForTag(success, base64Success => 
                {
                    //photo object with fields containing the base64 string, photo height, and photo width is created on the fly and then sent to the server
                    photo.photoData = base64Success;
                    //console.log(photo.photoData);
                    photo.photoWidth = cropData.displaySize.width;
                    photo.photoHeight = cropData.displaySize.height;
                    const user= this.state.user;
                    Connector.post('/user/update', photo, {email: user.email}, (res) => {
                        console.log(res);
                        this.props.navigation.pop();
                    });
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
