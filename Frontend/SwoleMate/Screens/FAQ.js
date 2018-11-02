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
            q: "How do I match with a user?",
            a: "On the profile screen, swipe right on their profile. If you do not want to match with them, swipe left."
        },
        {
            q: "How do I edit my profile?",
            a: "If you switch to the profile screen, you should be able to click an Edit button to change your profile."
        },
        {
            q: "What if I don't want people to match with me?",
            a: "There is an option on the Edit Profile screen where you can \"Go Ghost,\" meaning that users will not see your profile in their feed"
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
