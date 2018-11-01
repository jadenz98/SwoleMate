import React from 'react';
import styles from "./Styles/LoginScreenStyles";

import { Text, View, AsyncStorage, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight } from 'react-native';
//import SocketIOClient from 'socket.io-client';
import SelectMultiple from 'react-native-select-multiple';
import { GiftedChat } from 'react-native-gifted-chat';

import Connector from '../Utils/Connector';

export default class Messages extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      email: 'a@a.com'
    };
  }

  /*getConversation = () => {
    Connector.get('/user/conversation', {email1: 'a@a.com', email2: 's@s1'}, (conversation) => {
        console.log(conversation);
    });
  }*/

  onReceivedMessage = (messages) => {
    this.storeMessages(messages);
  }

  onSend = (messages=[]) => {
    //this.sendMessage()
    this.storeMessages(messages);
  }

    render(){
      var user ={_id: this.state.email}
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={user}
        />
      );
    }

    storeMessages = (messages) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, messages),
        };
      });
    }
}
