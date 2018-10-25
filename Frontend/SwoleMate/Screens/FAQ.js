import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import QnA from '../Components/QnA';

export default class FAQ extends React.Component {
    constructor(props){
        super(props);
        const { navigation } = this.props;
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
    static navigationOptions = {
        title: 'Frequently Asked Questions',
    };

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
