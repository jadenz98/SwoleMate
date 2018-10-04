import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './Styles/LoginScreenStyles';

export default class Profile extends React.Component{
    
    constructor(props){
        super(props);
        const { navigation } = this.props;
        name = navigation.getParam('username');
    }

        //This sets the title on the top header
        static navigationOptions = {
            title: 'Profile',
        };
    
    render(){
        return(
            <View>
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
        </View>
        );
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
        alert('Username: ' + name);
        //this.props.navigation.navigate('Profile');
    }
}