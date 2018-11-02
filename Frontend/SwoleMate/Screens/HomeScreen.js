import React from 'react';
import {TouchableOpacity, View, Text, Image, Button, StyleSheet} from 'react-native';
import styles from './Styles/HomeScreenStyles';
import globalStyles from './Styles/Global';
import Swiper from 'react-native-deck-swiper';
import Connector from '../Utils/Connector';
import { DrawerActions } from 'react-navigation';

import Loader from './Components/Loader';

export default class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const name = navigation.getParam('username');
        this.state = {
            user: null,
            picture: null,
            potentialMatches: []
        };

        Connector.get('/user', {email: props.navigation.dangerouslyGetParent().getParam('email')}, (res) => {
            this.setState({
                user: res,
                picture: res.photoData,
            });
            //console.log("\n\n\n\n\n" + res.photoData);
        });
        Connector.get('/user/nearbyUsers', {email: props.navigation.dangerouslyGetParent().getParam('email')}, (res)=>{
            this.setState({
                potentialMatches: res,
            });
            //console.log(res);
        });
    }

    //This sets the title on the top header
    static navigationOptions = ({ navigation }) => ({
        title: 'SwoleMate',
        headerLeft: (
            <TouchableOpacity style={globalStyles.hamburger} onPress = {() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                <Image
                    style={globalStyles.icon}
                    source={require('./images/hamburger.png')}
                />
            </TouchableOpacity>
        )
    });

    render(){
        let potentialMatchInfo = this.state.potentialMatches;
        if(potentialMatchInfo==null){
            return <Loader/>;
        }
        for(let i=0; i < potentialMatchInfo.length; i++){
            if(potentialMatchInfo[i].photoData === undefined){
                //console.log("\n\n\n\n\n\n\n\nIMAGE UNDEFINED\n\n\n\n\n\n\n\n")
                potentialMatchInfo[i].img=(
                    <Image style={{width: 300, height: 400}}
                        source={require('./images/generic-profile-picture.png')}
                    />
                );
            }
            else{
                const encodedData=potentialMatchInfo[i].photoData;
                potentialMatchInfo[i].img=(
                    <Image
                        style={{width: 300, height: 400}}
                        source={{uri: `data:image/jpeg;base64,${encodedData}`}}
                    />
                );
            }
        }

        return(
          <View style={{flex:1}}>
            <Swiper
                cards={potentialMatchInfo}
                //stackSize={2}
                renderCard={(card) => {
                    return (
                        <View style={styles.card}>
                            {card.img}
                            <Text> {card.email} </Text>
                        </View>
                    )
                }}
                onSwiped={(cardIndex) => {console.log(cardIndex)}}
                onSwipedRight={(cardIndex) => {
                    console.log("EMAIL 1: " + this.props.navigation.dangerouslyGetParent().getParam('email') + "\nEMAIL 2: " + this.state.potentialMatches[cardIndex].email);
                    Connector.post('/user/matches',{"email1": this.props.navigation.dangerouslyGetParent().getParam('email'), "email2": this.state.potentialMatches[cardIndex].email, "swipe": "true" },undefined,(res) => {
                        console.log("Match Status: " + res.success);
                        if (res.success) {
                          alert('You have a match');
                        }
                    });
                }}
                onSwipedLeft={(cardIndex) => {
                    console.log("EMAIL 1: " + this.props.navigation.dangerouslyGetParent().getParam('email') + "\nEMAIL 2: " + this.state.potentialMatches[cardIndex].email);
                    Connector.post('/user/matches',{"email1": this.props.navigation.dangerouslyGetParent().getParam('email'), "email2": this.state.potentialMatches[cardIndex].email, "swipe": "false" },undefined,(res) => {
                        console.log("Match Status: " + res.success);
                    });
                }}
                onSwipedAll={() => {console.log('No More Potential Matches')}}
                cardIndex={0}
                backgroundColor={'#45a1e8'}
                cardVerticalMargin={20}
                marginTop={0}
                marginBottom={0}
                >
            </Swiper>
        </View>
        );
    }

    goToMatches = () => {
        var userinfo={
            email: props.navigation.getParam('email'),
        };
        console.log("Going to matches: " + userinfo.email);
      this.props.navigation.navigate('Matches');

    };

    goToProfile = () => {
        //this alert tests that username was successfully recieved from previous page
        //alert('Username: ' + name);
        const { navigation } = this.props;
        var userinfo={
            email: navigation.getParam('email'),
            interests: navigation.getParam('interests')
        };
        this.props.navigation.navigate('Profile', userinfo);
    }
}
