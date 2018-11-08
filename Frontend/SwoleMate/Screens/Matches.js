import React from 'react';

import {Font, AppLoading } from 'expo';
import { Platform, Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight, FlatList, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements'

import Loader from './Components/Loader';
import Connector from '../Utils/Connector';

import MaterialIcons from '../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import globalStyles from "./Styles/Global";
import {DrawerActions} from "react-navigation";

export default class Matches extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: null,
            fontsAreLoaded: false,
            user: null,
            picture: null,
            matches: [],
        };
        Connector.get('/user', {email: this.props.navigation.dangerouslyGetParent().getParam('email')}, (res) => {
            this.setState({
                user: res,
                picture: res.photoData,
            });
            console.log("\n\n\n\n\n" + this.state.user);
        });
        Connector.get('/user/matches', {email: this.props.navigation.dangerouslyGetParent().getParam('email')}, (res)=>{
            this.setState({
                matches: res,
            });
        });
    }


    async componentDidMount(){
        if(Platform.OS === 'ios'){
        await Font.loadAsync({
            'Material Icons': require('../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf')
        });
        this.setState({
            fontsAreLoaded: true
        });
        }
        else{
            await Font.loadAsync({
                MaterialIcons
            });
            this.setState({
                fontsAreLoaded: true
            });
        }
        //console.log("\n\n\n\n\n\n\n\n\n\n\nFonts Loaded");
    }

    getMatches = () => {
        Connector.get('/user/matches', {email: 'sam@samingram.me'}, (matches) => {
            console.log(matches);
        });
    };

    //This sets the title on the top header
    static navigationOptions = ({ navigation }) => ({
        title: 'Matches',
        headerLeft: (
            <TouchableOpacity style={globalStyles.hamburger} onPress={() => {navigation.dispatch(DrawerActions.openDrawer());}}>
                <Image
                    style={globalStyles.icon}
                    source={require('./images/hamburger.png')}
                />
            </TouchableOpacity>
        )
    });

    render(){
        const matches = this.state.matches;
        if(matches==null||matches==undefined){
            return <Loader/>;
        }

        for(i = 0; i < matches.length; i++){
            matches[i].key = matches[i].email;
            //console.log(matches[i]);
            if(matches[i].photoData === undefined){
                matches[i].imgSrc = require('./images/generic-profile-picture.png');
            } else {
                const encodedData=matches[i].photoData;
                matches[i].imgSrc = {uri: `data:image/jpeg;base64,${encodedData}`};
            }
        }

        const { fontsAreLoaded } = this.state.fontsAreLoaded;
        //const encodedData=this.state.picture;
        return(
            <View style={globalStyles.background}>
                <List>
                    <FlatList
                        data={matches}
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
                                avatar = {item.imgSrc}
                                onPress={()=> {
                                        var userinfo={
                                            email: this.props.navigation.dangerouslyGetParent().getParam('email'),
                                            email2: item.email,
                                        };
                                        this.props.navigation.dangerouslyGetParent().navigate('Messages', userinfo);
                                    }
                                }
                                title={item.name}>
                            </ListItem>
                            ) : null
                        }
                    />
                </List>
            </View>
        );
    }
}
