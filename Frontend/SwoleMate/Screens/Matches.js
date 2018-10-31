import React from 'react';
import styles from "./Styles/LoginScreenStyles";

import {Font, AppLoading } from 'expo';
import {MaterialIcons} from '@expo/vector-icons';
import { Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'

import SelectMultiple from 'react-native-select-multiple';

import Connector from '../Utils/Connector';


export default class Matches extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: null,
            fontsAreLoaded: false,
            user: null,
            picture: null
        }
        Connector.get('/user', {email: props.navigation.getParam('email')}, (res) => {
            this.setState({
                user: res,
                picture: res.photoData,
            });
            console.log("\n\n\n\n\n" + this.state.user);
        });
    }

   async componentDidMount(){
        await Font.loadAsync({
            'Material Icons' : require('../fonts/MaterialIcons.ttf')
        });
        this.setState({
            fontsAreLoaded: true
        });
        //console.log("\n\n\n\n\n\n\n\n\n\n\nFonts Loaded");
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
        const { fontsAreLoaded } = this.state.fontsAreLoaded;
        const encodedData=this.state.picture;
        return( 
            <View>
                <List>
                    <FlatList

                        data={[
                            {key: 'Jaden'},
                            {key: 'Sam'},
                            {key: 'Steven'},
                            {key: 'Ryan'},
                            {key: 'Kevin'},
                        ]}
                        renderItem={({item}) =>
                            /*<TouchableOpacity>
                                <Text>
                                    {item.key}
                                </Text>
                            </TouchableOpacity> */
                            // remove or comment the TouchableOpacity code above and uncomment code below
                           this.state.fontsAreLoaded ? (
                           <ListItem
                                roundAvatar
                                avatar = {{uri: `data:image/gif;base64,${encodedData}`}}
                                title={item.key}>
                            </ListItem>
                            ) : null
                        }
                    />
                </List>
            </View>
        );
    }
}
