import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import QnA from './Components/QnA';
import globalStyles from './Styles/Global';
import {DrawerActions} from "react-navigation";

export default class FAQ extends React.Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    questions = [
        {
            q: "How now brown cow?",
            a: "Because"
        },
        {
            q: "Hello World",
            a: "Goodbye World"
        },
        {
            q: "Why?",
            a: "Who knows"
        }
    ];

    //This sets the title on the top header
    static navigationOptions = ({ navigation }) => ({
        title: 'Frequently Asked Questions',
        headerLeft:
            <TouchableOpacity style={globalStyles.hamburger} onPress = {() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                <Image
                    style={globalStyles.icon}
                    source={require('./images/hamburger.png')}
                />
            </TouchableOpacity>
    });

    render () {
        const questions = [];

        for (let i = 0; i < this.questions.length; i++) {
            questions.push(<QnA question={this.questions[i].q} answer={this.questions[i].a} key={i}/>);
        }

        return (
            <View style={{flex:1, alignItems: 'stretch'}}>
                {questions}
            </View>
        );
    }
}
