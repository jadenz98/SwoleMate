import React from 'react';
import {TouchableOpacity, View, Text, Image, Button, StyleSheet} from 'react-native';
import styles from './Styles/HomeScreenStyles';
import Swiper from 'react-native-deck-swiper';
import Connector from '../Utils/Connector';


export default class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        const { navigation } = this.props;
        const name = navigation.getParam('username');
        this.state={
            user: null,
            picture: null,
            potentialMatches: [],
        }

        Connector.get('/user', {email: props.navigation.getParam('email')}, (res) => {
            this.setState({
                user: res,
                picture: res.photoData,
            });
            //console.log("\n\n\n\n\n" + res.photoData);
        });
        Connector.get('/user/nearbyUsers', {email: props.navigation.getParam('email')}, (res)=>{
            this.setState({
                potentialMatches: res,
            });
            //console.log(res);
        });
    }
    //This sets the title on the top header
    static navigationOptions = ({ navigation }) => {
        var userinfo={
            email: navigation.getParam('email'),
        };
        return{
            title: 'SwoleMate',
            headerRight: (
                <TouchableOpacity  onPress={() => navigation.navigate('Matches',userinfo)}>
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
                navigation.navigate('Profile', userinfo);
            }}>
              <Image
                  style={styles.icon}
                  source={require('./generic-profile-picture.png')}
              />
                </TouchableOpacity>
              ),
        };
    };


    render(){
        potentialMatchInfo = this.state.potentialMatches;
        if(potentialMatchInfo==null){
            return null;
        }
        for(i=0;i<potentialMatchInfo.length;i++){
            if(potentialMatchInfo[i].photoData==undefined){
                //console.log("\n\n\n\n\n\n\n\nIMAGE UNDEFINED\n\n\n\n\n\n\n\n")
                potentialMatchInfo[i].img=(
                    <Image style={{width: 300, height: 400}}
                        source={require('./generic-profile-picture.png')}
                    />
                );
            }
            else{
                //console.log("\n\n\n\n\n\n\n\nIMAGE DEFINED\n\n\n\n\n\n\n\n")

                const encodedData=potentialMatchInfo[i].photoData;
                console.log("\n\n\n\n\n" + encodedData);
                potentialMatchInfo[i].img=(
                <Image style={{width: 300, height: 400}}
                 source={{uri: `data:image/jpeg;base64,${encodedData}`}}
                />
                );
            }
        }
        /*const encodedData=this.state.picture;
        const img = (
            <Image style={{width: 300, height: 400}}
                 source={{uri: `data:image/gif;base64,${encodedData}`}}
            />
        );*/
        //console.log("\n\n\n\n\n" + encodedData);
        return(
          <View>
            <Swiper
<<<<<<< HEAD
                cards={potentialMatchInfo}
                
=======
                cards={[{word:'Hello', otherWord:'World', img: img},{word:'Goodbye', otherWord:'World', img: img}]}

>>>>>>> 22989e5a2cfb70a47d649ea50a8cfa6865932c25
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
                    console.log("EMAIL 1: " + this.props.navigation.getParam('email') + "\nEMAIL 2: " + this.state.potentialMatches[cardIndex].email);
                    Connector.post('/user/matches',{"email1": this.props.navigation.getParam('email'), "email2": this.state.potentialMatches[cardIndex].email, "swipe": "true" },undefined,(res) => {
                        console.log("Match Status: " + res.success);
                    });
                }}
                onSwipedLeft={(cardIndex) => {
                    console.log("EMAIL 1: " + this.props.navigation.getParam('email') + "\nEMAIL 2: " + this.state.potentialMatches[cardIndex].email);
                    Connector.post('/user/matches',{"email1": this.props.navigation.getParam('email'), "email2": this.state.potentialMatches[cardIndex].email, "swipe": "false" },undefined,(res) => {
                        console.log("Match Status: " + res.success);
                    });
                }}
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
