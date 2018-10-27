import React from 'react';

import AssetUtils from 'expo-asset-utils';

import {ImageEditor, ImageStore, Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

import NativeModules from 'NativeModules';

import CameraRollPicker from 'react-native-camera-roll-picker'

import ImageResizer from 'react-native-image-resizer';

import Connector from '../Utils/Connector';

export default class PickPhoto extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            photos: [],
            user: null,
            smallerPhotoUri: null,
        }
        Connector.get('/user', {email: props.navigation.getParam('email')}, (res) => {
            this.setState({user: res});
            console.log(res);
        });
        //this.save = this.save.bind(this);
    }

    

    static navigationOptions = {
        title: 'Pick Photo',
    };

    getSelectedImages = (image) =>{
        console.log(image);
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
        //let newUser = this.state.user;
        let photo = {};
        //base64Photos = [];
        //console.log("photos length:" + this.state.photos.length);
        //for(i=0;i<this.state.photos.length;i++){
        //console.log("uri: " + this.state.photos[0].uri + "\nWidth: " + ((this.state.photos[0].width)/4) + "\nheight: " + ((this.state.photos[0].height/4)));
        //NativeModules.RNAssetResizeToBase64.assetToResizedBase64( this.state.photos[0].uri,((this.state.photos[0].width)/4),((this.state.photos[0].height/4)),(err, base64) => console.log(base64));
        //AssetResizer.assetToResizedBase64(this.state.photos[0].uri, ((this.state.photos[0].width)/4),((this.state.photos[0].height/4)), (err, base64) => console.log(base64));
        /*ImageResizer.createResizedImage(this.state.photos[0].uri,(this.state.photos[0].width)/4,(this.state.photos[0].height)/4,'JPEG',80)
        .then(({ uri }) => {
            this.setState({
                smallerPhotoUri: uri,
            });
            //console.log(this.state.smallerPhotoUri);
        })
        .catch(error => {
            console.log(error);
        });*/
        cropData = {
            offset: {x: 0, y: 0},
            size: {
                width: this.state.photos[0].width,
                height: this.state.photos[0].height,
            },
            displaySize: {
                width: ((this.state.photos[0].width)/12),
                height: ((this.state.photos[0].height)/12)
            }
        };
        ImageEditor.cropImage(this.state.photos[0].uri, cropData, success => { 
            console.log("THIS IS THE URI: " + success);
            ImageStore.getBase64ForTag(success, base64Success =>
                {
                    console.log(base64Success);
                    photo.photoData = base64Success;
                    photo.photoWidth = cropData.displaySize.width;
                    photo.photoHeight = cropData.displaySize.height;
                    const user= this.state.user;
                    Connector.post('/user/update', photo, {email: user.email}, () => {
                        this.props.navigation.pop();
                    }
                    );
                    
                }, base64Failure => {console.log(base64Failure)});
        }, failure => { console.log(failure)});
        /*AssetUtils.base64forImageUriAsync(this.state.smallerPhotoUri)
        .then(base64data => {
            //base64Photos[i]=base64data;
            photo.photoData = base64data.data;
            //photo.photoWidth = base64data.size.width;
            //photo.photoHeight = base64data.size.height;
            //photo.email = this.state.user.email;
            /*this.setState({
                user: newUser,
                photo: photo,
            });*/
            //console.log(JSON.stringify(photo));
            //console.log(base64data.data);
            //console.log(base64data.size)
            //console.log("\n\n\n\n\n\n\n\n\n\n\n\n" + JSON.stringify(photo)); //when running this redirect output to file
        /*}).then( success => {
            const user = this.state.user;
            console.log(user.email);
            Connector.post('/user/update', photo, {email: user.email}, () => {
                this.props.navigation.pop();
            });
        }).catch(err => {
            console.log(err);
        });
        //}*/
        
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
