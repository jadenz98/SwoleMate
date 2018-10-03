import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './Styles/LoginScreenStyles';

export default class Profile extends React.Component{
    
        //This sets the title on the top header
        static navigationOptions = {
            title: 'Profile',
        };
    
    render(){
        return(
            <TouchableOpacity style={styles.clearButton} onPress={this.editProfile}>
                <Text>
                    Edit
                </Text>        
            </TouchableOpacity>
        );
    }

    editProfile = () => {
        this.props.navigation.navigate('EditProfile');
    }
}