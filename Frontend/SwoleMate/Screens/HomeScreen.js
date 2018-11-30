import React from 'react';
import { TouchableOpacity, View, Text, Image, Alert } from 'react-native';
import styles from './Styles/HomeScreenStyles';
import globalStyles from './Styles/Global';
import Swiper from 'react-native-deck-swiper';
import Connector from '../Utils/Connector';
import { DrawerActions } from 'react-navigation';

import Loader from './Components/Loader';

export default class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            picture: null,
            potentialMatches: []
        };

        //gets current user information from the server using the email passed from the previous screen
        Connector.get('/user', {email: props.navigation.dangerouslyGetParent().getParam('email')}, (res) => {
            this.setState({
                user: res,
                picture: res.photoData,
            });
        });
        //gets all nearby users to current user (matching currently stored search criteria)
        Connector.get('/user/nearbyUsers', {email: props.navigation.dangerouslyGetParent().getParam('email')}, (res)=>{
            this.setState({
                potentialMatches: res,
            });
        });
    }

    //This sets any options for the header navigation bar
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

        //if potentialMatches have not loaded, show a loading screen
        if(potentialMatchInfo==null){
            return <Loader/>;
        }
        for(let i=0; i < potentialMatchInfo.length; i++){ //for each nearby user that is a potential match
            //if the user does not have a profile photo on file, use a generic photo
            if(potentialMatchInfo[i].photoData === undefined){
                potentialMatchInfo[i].img=(
                    <Image style={{width: 300, height: 400}}
                           source={require('./images/generic-profile-picture.png')}
                    />
                );
            }
            else{//if the user does have a profile photo on file
                const birthday = potentialMatchInfo[i].birthday;
                const bm = parseInt(birthday.substring(0,2), 10);
                const bd = parseInt(birthday.substring(3,5), 10);
                const by = parseInt(birthday.substring(6), 10);

                const today = new Date
                const dd = parseInt(today.getDate(), 10);
                const mm = parseInt(today.getMonth()+1, 10); //January is 0!
                const yyyy = parseInt(today.getFullYear(), 10);

                let age;
                if(bm < mm || (bm == mm && bd <= dd)) {
                    age = yyyy - by;
                }
                else {
                    age = yyyy - by - 1;
                }
                potentialMatchInfo[i].age = age;

                //add img field to that particular user information object which contains an image component with their profile image
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
                    renderCard={(card) => {
                        return (
                            <View style={styles.card}>
                                {card.img}
                                <Text> {card.email} </Text>
                                <Text> {card.age} </Text>
                            </View>
                        )
                    }}
                    onTapCard={(cardIndex) => {this.props.navigation.navigate('ExpandedProfile',{originalEmail: this.state.user.email, email: this.state.potentialMatches[cardIndex].email})}}
                    onSwipedRight={(cardIndex) => {
                        Connector.post('/user/matches',{"email1": this.props.navigation.dangerouslyGetParent().getParam('email'), "email2": this.state.potentialMatches[cardIndex].email, "swipe": "true" },undefined,(res) => {
                            if (res.success) {
                                Connector.get('/user', {email: this.state.potentialMatches[cardIndex].email}, (res) => {
                                    Alert.alert(
                                        'You Have A Match!',
                                        'You matched with ' + res.name,
                                        [
                                            {text: 'Keep Swiping',},
                                            {text: 'Send A Message', onPress: () => {
                                                const userInfo = {
                                                    email: this.props.navigation.dangerouslyGetParent().getParam('email'),
                                                    email2: this.state.potentialMatches[cardIndex].email,
                                                }
                                                this.props.navigation.dangerouslyGetParent().navigate('Messages', userInfo);
                                            }}
                                        ]
                                    );
                                });
                            }
                        });
                    }}
                    onSwipedLeft={(cardIndex) => {
                        Connector.post('/user/matches',{"email1": this.props.navigation.dangerouslyGetParent().getParam('email'), "email2": this.state.potentialMatches[cardIndex].email, "swipe": "false" },undefined,(res) => {
                        });
                    }}
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

    //takes user to matches screen and passes email as a parameter
    goToMatches = () => {
        const userinfo = {
            email: props.navigation.getParam('email'),
        };
        this.props.navigation.navigate('Matches', userinfo);
    };

    //takes user to their profile screen and passes email and interests as a parameter
    goToProfile = () => {
        const { navigation } = this.props;
        const userinfo = {
            email: navigation.getParam('email'),
            interests: navigation.getParam('interests')
        };
        this.props.navigation.navigate('Profile', userinfo);
    }
}
