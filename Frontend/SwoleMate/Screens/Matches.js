import React from 'react';
import styles from "./Styles/LoginScreenStyles";

import { Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

import Connector from '../Utils/Connector';

export default class Matches extends React.Component{

  getMatches = () => {
    Connector.get('/user/matches', {email: 'sam@samingram.me'}, (matches) => {
        console.log(matches);
    });
  }

        //This sets the title on the top header
        static navigationOptions = {
            title: 'Matches',
        };

    render(){
        return(<TouchableOpacity onPress={this.getMatches}>
          <Text>
            See Matches
          </Text>
        </TouchableOpacity>);
    }
}
