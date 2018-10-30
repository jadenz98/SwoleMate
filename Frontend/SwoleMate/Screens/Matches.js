import React from 'react';
import styles from "./Styles/LoginScreenStyles";
import globalStyles from './Styles/Global';
import { Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight, FlatList, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements'

import SelectMultiple from 'react-native-select-multiple';

import Connector from '../Utils/Connector';
import {DrawerActions} from "react-navigation";

export default class Matches extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: null
        };

        console.log(props.navigation.dangerouslyGetParent().getParam('email') + " Matches");
    }

    getMatches = () => {
        Connector.get('/user/matches', {email: 'sam@samingram.me'}, (matches) => {
            console.log(matches);
        });
    };

    //This sets the title on the top header
    static navigationOptions = ({ navigation }) => ({
        title: 'Matches',
        headerLeft:
            <TouchableOpacity style={globalStyles.button} onPress = {() => {navigation.dispatch(DrawerActions.openDrawer()); console.log("asdfasdfsf");}}>
                <Image
                    style={globalStyles.icon}
                    source={require('./images/hamburger.png')}
                />
            </TouchableOpacity>
    });

    render(){
        return(
            <View>
                {/*<List>*/}
                    <FlatList

                        data={[
                            {key: 'Jaden'},
                            {key: 'Sam'},
                            {key: 'Steven'},
                            {key: 'Ryan'},
                            {key: 'Kevin'},
                        ]}
                        keyExtractor={(x,i) => i}
                        renderItem={({item}) =>
                            <TouchableOpacity>
                                <Text>
                                    {item.key}
                                </Text>
                            </TouchableOpacity>
                            /* remove or comment the TouchableOpacity code above and uncomment code below
                            <ListItem
                                title={item.key}
                            </ListItem>*/
                        }
                    />
                {/*</List>*/}
            </View>
        );

    }
}
