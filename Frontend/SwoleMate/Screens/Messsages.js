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

 /* static navigationOptions = ({ navigation }) => ({
    title: 'SwoleMate',
    headerRight: (
        <TouchableOpacity onPress = {this.unmatch(navigation.dangerouslyGetParent().getParams('email'),navigation.dangerouslyGetParent().getParams('email2'))}>
            <Text>
              Unmatch
            </Text>
        </TouchableOpacity>
    )
});*/

unmatch = (email1,email2) => {

}

  componentWillMount() {
    Connector.get('/user/conversation', {email1: 'a@a.com', email2: 'c@c.com'}, (conversation) => {
      console.log(conversation);
      for(var i = 0; i < conversation.length; i++){
        var msg =
          {
            _id: i,
            text: conversation[i].msg,
            user:{
              _id: conversation[i].email,
            }
          }
        this.setState((previousState) => {
          return{
            messages: GiftedChat.append(previousState.messages, msg),
          };
        });
      }
    });

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
    console.log(messages);
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
