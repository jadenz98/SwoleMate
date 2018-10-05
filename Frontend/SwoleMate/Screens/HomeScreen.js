import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import styles from './Styles/HomeScreenStyles';


export default class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        const { navigation } = this.props;
        const name = navigation.getParam('username');
    }
    //This sets the title on the top header
    static navigationOptions = {
        title: 'SwoleMate',
    };

    render(){
        return(
          <View>
            <TouchableOpacity style={styles.button} onPress={this.goToProfile}>
                    <Text>
                        Profile
                    </Text>
                    {/*<Image
                        style={styles.icon}
                        source={require('./generic-profile-picture.png')}
                    />*/}
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goToMatches}>
                  <Text>
                    Matches
                  </Text>
                </TouchableOpacity>
        </View>
        );
    }

    goToMatches = () => {
      this.props.navigation.navigate('Matches');

    }

    goToProfile = () => {
        //this alert tests that username was successfully recieved from previous page
        //alert('Username: ' + name);
        const { navigation } = this.props;
        var userinfo={
            email: navigation.getParam('email')
        };
        this.props.navigation.navigate('Profile', userinfo);
    }
}
