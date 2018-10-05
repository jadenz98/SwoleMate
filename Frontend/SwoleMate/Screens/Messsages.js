import React from 'react';
import styles from "./Styles/LoginScreenStyles";

import { Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

import Connector from '../Utils/Connector';

export default class Messages extends React.Component{

  getConversation = () => {
    Connector.get('/user/conversation', {email1: 'sam@samingram.me', email2: 'asdf@asdf.com'}, (conversation) => {
        console.log(conversation);
    });
  }

    render(){
        return null;
    }
}
