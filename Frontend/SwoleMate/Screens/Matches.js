import React from 'react';
import styles from "./Styles/LoginScreenStyles";

import { Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'

import SelectMultiple from 'react-native-select-multiple';

import Connector from '../Utils/Connector';

export default class Matches extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: null
        }
    }

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
        return(
<<<<<<< HEAD
          <TouchableOpacity onPress={this.getMatches}>
          <Text>
            See Matches
          </Text>
        </TouchableOpacity>);
=======
            <View>
                <FlatList
                    
                    data={[
                        {key: 'Jaden'},
                        {key: 'Sam'},
                        {key: 'Steven'},
                        {key: 'Ryan'},
                        {key: 'Kevin'},
                    ]}
                    renderItem={({item}) =>
                        <TouchableOpacity>
                            <Text>
                                {item.key}
                            </Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
          
>>>>>>> 6d25b00b983224aa943b8c11be9ef2718353e75c
    }
}
