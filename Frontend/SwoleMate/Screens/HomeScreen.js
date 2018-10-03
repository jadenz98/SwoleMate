import React from 'react';
import {TouchableOpacity,View,Text,Image} from 'react-native';
import styles from './Styles/HomeScreenStyles';


export default class HomeScreen extends React.Component{
    
        //This sets the title on the top header
        static navigationOptions = {
            title: 'SwoleMate',
            headerRight: (
                <TouchableOpacity style={styles.button}>
                    <Image
                        style={styles.icon}
                        source={require('./generic-profile-picture.png')}
                    />
                </TouchableOpacity>
            )
        };
    
    render(){
        return null;
    }
}