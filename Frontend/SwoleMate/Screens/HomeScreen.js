import React from 'react';
import {TouchableOpacity, View, Text, Image, Button, StyleSheet} from 'react-native';
import styles from './Styles/HomeScreenStyles';
import Swiper from 'react-native-deck-swiper';

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        const { navigation } = this.props;
        const name = navigation.getParam('username');
    }
    //This sets the title on the top header
    static navigationOptions = ({ navigation }) => {
        return{
            title: 'SwoleMate',
            headerRight: (
                <TouchableOpacity  onPress={() => navigation.navigate('Matches')}>
                  <Text>
                      Matches
                  </Text>
              </TouchableOpacity>),
            headerLeft: (
              <TouchableOpacity style={styles.button} onPress ={ () => {
                //this alert tests that username was successfully recieved from previous page
                //alert('Username: ' + name);
                
                var userinfo={
                    email: navigation.getParam('email'),
                    interests: navigation.getParam('interests')
                };
                navigation.navigate('FAQ', userinfo);
            }}>
              {/*<Text>
                  Profile
              </Text>*/}
              <Image
                  style={styles.icon}
                  source={require('./generic-profile-picture.png')}
              />
                </TouchableOpacity>
              ),
        };
    };

    render(){
        return(
          <View>
            <Swiper
                cards={[{word:'Hello', otherWord:'World'},{word:'Goodbye', otherWord:'World'}]}
                
                //stackSize={2}
                renderCard={(card) => {
                    return (
                        <View style={styles.card}>
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
