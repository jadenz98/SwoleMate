import React from 'react';
import {TouchableOpacity, Text, View, Image, Button} from 'react-native';
import styles from './Styles/LoginScreenStyles';

export default class Profile extends React.Component{

    constructor(props){
        super(props);
        const { navigation } = this.props;
        renderImage={
            'Swimming': false,
            'Running': false,
            'Lifting': false,
            'Hiking': false,
        };
        interests = navigation.getParam('interests');

        var i;
        for(i=0;i<interests.length;i++){
            if(interests[i] in renderImage){
                renderImage[interests[i]]=true;
            }
        }
    }

        //This sets the title on the top header
        static navigationOptions = {
            title: 'Profile',
        };

    render(){
        var images = (
            <View>
            {renderImage['Swimming'] && <Image  source={require('./images/Swimming.png')}
            />}
            {renderImage['Running'] &&<Image  source={require('./images/Running.png')}
            />}
            {renderImage['Lifting'] && <Image  source={require('./images/Lifting.png')}
            />}
            {renderImage['Hiking'] &&<Image  source={require('./images/Hiking.png')}
            />}
            </View>
        )

        /*var i;
        for(i=0; i<interests.length; i++){
            var uri = './images/'+interests[i]+'.png'
            images += <Image  source={{uri}}
            />
        }*/
        return(

        <View>
            {images}
            <TouchableOpacity style={styles.clearButton} onPress={this.editProfile}>
                <Text>
                    Edit
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={this.testName}>
            <Text>
                Test
            </Text>
        </TouchableOpacity>

        <Button
          onPress={this.logout}
          title="Logout"
          color="#f4553d"
          accessibilityLabel="Logout of Swolemate account"
        />

        </View>
        );
    }

    logout = () => {
      this.props.navigation.navigate('Login');
    }

    editProfile = () => {
        const { navigation } = this.props;
        var userinfo={
            email: navigation.getParam('email'),
            interests: navigation.getParam('interests'),
        }
        this.props.navigation.navigate('EditProfile',userinfo);
    }

    testName = () => {
        //this alert tests that username was successfully recieved from previous page
        alert('Interests1: ' + interests[0] + "\nInterests2: " + interests[1]);
        //this.props.navigation.navigate('Profile');
    }
}
