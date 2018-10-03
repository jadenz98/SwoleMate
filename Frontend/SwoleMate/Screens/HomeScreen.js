import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import styles from './Styles/HomeScreenStyles';


export default class HomeScreen extends React.Component{
    
    constructor(props){
        super(props);
        const { navigation } = this.props;
        name = navigation.getParam('username');
    }
    //This sets the title on the top header
    static navigationOptions = {
        title: 'SwoleMate',
    };
    
    render(){
        return(
            <TouchableOpacity style={styles.button} onPress={this.goToProfile}>
                    {/*<Image
                        style={styles.icon}
                        source={require('./generic-profile-picture.png')}
                    />*/}
                </TouchableOpacity>
        );
    }

    goToProfile = () => {
        //this alert tests that username was successfully recieved from previous page
        //alert('Username: ' + name);
        this.props.navigation.navigate('Profile');
    }
}