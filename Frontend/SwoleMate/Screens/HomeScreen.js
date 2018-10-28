import React from 'react';
import {TouchableOpacity, View, Text, Image, Button, StyleSheet} from 'react-native';
import styles from './Styles/HomeScreenStyles';
import Swiper from 'react-native-deck-swiper';
import Connector from '../Utils/Connector';
import { DrawerActions } from 'react-navigation';

export default class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const name = navigation.getParam('username');
        this.state = {
            user: null,
            picture: null
        };
        Connector.get('/user', {email: props.navigation.getParam('email')}, (res) => {
            this.setState({
                user: res,
                picture: res.photoData,
            });
            //console.log("\n\n\n\n\n" + res.photoData);
        });
    }

    //This sets the title on the top header
    static navigationOptions = ({ navigation }) => ({
        title: 'SwoleMate',
        headerRight: (
            <TouchableOpacity  onPress={() => navigation.navigate('Matches')}>
              <Text>
                  Matches
              </Text>
            </TouchableOpacity>
        ),
        headerLeft:
            <TouchableOpacity style={styles.button} onPress = {() => {navigation.dispatch(DrawerActions.openDrawer()); console.log("asdfasdfsf");}}>
                <Image
                    style={styles.icon}
                    source={require('./generic-profile-picture.png')}
                />
            </TouchableOpacity>
    });

    render(){
        const encodedData=this.state.picture;
        const img = (
            <Image style={{width: 300, height: 400}}
                 source={{uri: `data:image/gif;base64,${encodedData}`}}
            />
        );
        //console.log("\n\n\n\n\n" + encodedData);

        return(
          <View>
            <Swiper
                cards={[{word:'Hello', otherWord:'World', img: img},{word:'Goodbye', otherWord:'World', img: img}]}

                //stackSize={2}
                renderCard={(card) => {
                    return (
                        <View style={styles.card}>
                            {img}
                            <Text> {card.word}{card.otherWord} </Text>
                        </View>
                    )
                }}
                onSwiped={(cardIndex) => {console.log(cardIndex)}}
                onSwipedAll={() => {console.log('No More Potential Matches')}}
                cardIndex={0}
                backgroundColor={'#45a1e8'}
                cardVerticalMargin={20}
                marginTop={0}
                marginBottom={120}
                >
            </Swiper>
        </View>
        );
    }

    goToMatches = () => {
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
