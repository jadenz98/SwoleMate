import React from 'react';

import { Font } from 'expo';
import { Platform, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements'

import Loader from './Components/Loader';
import Connector from '../Utils/Connector';

import MaterialIcons from '../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import globalStyles from "./Styles/Global";
import { DrawerActions } from "react-navigation";

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

        //gets the user information using the email passed from the previous screen
        Connector.get('/user', {email: this.props.navigation.dangerouslyGetParent().getParam('email')}, (res) => {
            this.setState({
                user: res,
                picture: res.photoData,
            });
        });

        //gets the users matches using the email passed from the previous screen
        Connector.get('/user/matches', {email: this.props.navigation.dangerouslyGetParent().getParam('email')}, (res)=>{
            this.setState({
                matches: res,
            });
        });
    }

    //once the component mounts, it checks the current OS running the app and determines which way to load the required font
    async componentDidMount() {
        this.subs = [
            this.props.navigation.addListener("didFocus", () => {
                //gets the users matches using the email passed from the previous screen
                Connector.get('/user/matches', {email: this.props.navigation.dangerouslyGetParent().getParam('email')}, (res)=>{
                    this.setState({
                        matches: res,
                        isFocused: true
                    });
                });
            }),
            this.props.navigation.addListener("willBlur", () => {
                this.setState({ isFocused: false })
            })
        ];

        if(Platform.OS === 'ios'){
            await Font.loadAsync({
                'Material Icons': require('../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf')
            });
            this.setState({
                fontsAreLoaded: true
            });
        } else {
            await Font.loadAsync({
                MaterialIcons
            });
            this.setState({
                fontsAreLoaded: true
            });
        }
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
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
        if (!this.state.isFocused)
            return null;

        let matches = this.state.matches;
        if (matches == null || !matches) {
            return <Loader/>;
        }

        //for each match of the current user, set the appropriate image source depending on whether the user has a chosen profile image
        for (let i = 0; i < matches.length; i++) {
            matches[i].key = matches[i].email;
            if(matches[i].photoData === undefined){
                matches[i].imgSrc = require('./images/generic-profile-picture.png');
            } else {
                const encodedData=matches[i].photoData;
                matches[i].imgSrc = {uri: `data:image/jpeg;base64,${encodedData}`};
            }
        }

        if (matches.length === 0)
            matches = [{name: "You currently do not have any matches...", key: "0"}];

        return (
            <View style={globalStyles.background}>
                <List>
                    <FlatList
                        data={matches}
                        renderItem={({item}) => {
                            let listItem;
                            if (matches[0].name === "You currently do not have any matches...") {
                                listItem = (
                                    <ListItem
                                        subtitle={item.name}
                                    />
                                );
                            } else {
                                listItem = (
                                    <ListItem
                                        roundAvatar
                                        avatar = {item.imgSrc}
                                        onPress={()=> {
                                            const userinfo = {
                                                email: this.props.navigation.dangerouslyGetParent().getParam('email'),
                                                email2: item.email,
                                            };

                                            this.props.navigation.dangerouslyGetParent().navigate('Messages', userinfo);
                                        }}
                                        title={item.name}
                                    />
                                );
                            }

                            // once fonts are loaded, the the list item components for the data above are rendered
                            return this.state.fontsAreLoaded ? listItem : null
                        }}
                    />
                </List>
            </View>
        );
    }
}