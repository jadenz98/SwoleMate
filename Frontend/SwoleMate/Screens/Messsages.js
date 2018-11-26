import React from 'react';

import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Connector from '../Utils/Connector';

import globalStyles from './Styles/Global';

import { Header } from 'react-navigation';

export default class Messages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            email: this.props.navigation.dangerouslyGetParent().getParam('email'),
            reEmail: this.props.navigation.getParam('email2'), //email of person receiving the messages
            latestID: -1,
        };

        this.props.navigation.setParams({ title: this.state.reEmail })
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('email2'),
        headerRight: (
            <TouchableOpacity
                onPress = {()=>{
                    Connector.post(
                        '/user/unmatch',
                        {
                            email1: navigation.getParam('email'),
                            email2: navigation.getParam('email2')
                        }, {
                            email: navigation.getParam('email')
                        }, (res)=>{
                            console.log(res);
                        }
                    );
                }}
                style = { StyleSheet.flatten([globalStyles.btnDanger, {marginRight: 15, width: undefined}]) }
            >
                <Text style = {globalStyles.btnText}>
                    Unmatch
                </Text>
            </TouchableOpacity>
        )
    });

    componentWillMount() {
        this._interval = setInterval(() => {
            Connector.get('/user/conversation', {email1: this.state.email, email2: this.state.reEmail}, (conversation) => {
                for(let i = 0; i < conversation.length; i++){
                    if(conversation[i]._id > this.state.latestID){
                        let msg = {
                            _id: conversation[i]._id,
                            text: conversation[i].msg,
                            user:{
                                _id: conversation[i].email,
                            }
                        };
                        this.setState((previousState) => {
                            return{
                                messages: GiftedChat.append(previousState.messages, msg),
                            };
                        });
                        this.setState({ latestID: conversation[i]._id});
                    }
                }
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    /*componentWillMount() {
      Connector.get('/user/conversation', {email1: this.state.email, email2: this.state.reEmail}, (conversation) => {
        console.log(conversation);
        for(var i = 0; i < conversation.length; i++){
          var msg =
            {
              _id: conversation[i]._id,
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

    }*/

    /*getConversation = () => {
      Connector.get('/user/conversation', {email1: 'a@a.com', email2: 's@s1'}, (conversation) => {
          console.log(conversation);
      });
    }*/

    onReceivedMessage = (messages) => {
        this.storeMessages(messages);
    };

    onSend = (messages=[]) => {
        console.log(messages);
        Connector.post('/user/conversation', {sender: this.state.email, re: this.state.reEmail, msg: messages[0].text}, {email: this.state.email}, (res) => {
            //console.log(res);
        });
        //this.storeMessages(messages);
    };

    render(){
        const user = {
            _id: this.state.email
        };
        return (
            <KeyboardAvoidingView
                style={{flex:1}}
                behavior="padding"
                keyboardVerticalOffset={Header.HEIGHT + 20}
            >
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={user}
                    placeholder='Type a message...'
                />
            </KeyboardAvoidingView>
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
