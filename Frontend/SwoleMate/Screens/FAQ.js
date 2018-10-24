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
            q: "How?",
            a: "Because"
        },
        {
            q: "Why?",
            a: "Idk man"
        }
    ];

    //This sets the title on the top header
    static navigationOptions = {
        title: 'Frequently Asked Questions',
    };

    render () {
        const questions = [];

        for (let question in this.questions) {
            questions.concat(<QnA question={question.q} answer={question.a} />);
        }

        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                {questions}
            </View>
        );
    }
}
