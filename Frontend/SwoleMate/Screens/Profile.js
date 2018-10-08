import React from 'react';
import {TouchableOpacity, Text, View, Image, Button} from 'react-native';
import styles from './Styles/LoginScreenStyles';
import Connector from "../Utils/Connector";

export default class Profile extends React.Component{

    constructor(props){
        super(props);
        const { navigation } = this.props;
        this.renderImage={
                'Swimming': false,
                'Running': false,
                'Lifting': false,
                'Hiking': false,
        };
        this.state = {
            user: null
        };

        Connector.get('/user', {email: props.navigation.getParam('email')}, (res) => {
            this.setState({user: res});

            
            const interests = res.interests;

            for(let i=0;i<interests.length;i++){
                if(interests[i] in this.renderImage){
                    this.renderImage[interests[i]]=true;
                }
            }
        });
    }

    //This sets the title on the top header
    static navigationOptions = {
        title: 'Profile',
    };

    render(){
        const images = (
            <View>
            {this.renderImage['Swimming'] && <Image  source={require('./images/Swimming.png')}
            />}
            {this.renderImage['Running'] && <Image  source={require('./images/Running.png')}
            />}
            {this.renderImage['Lifting'] && <Image  source={require('./images/Lifting.png')}
            />}
            {this.renderImage['Hiking'] && <Image  source={require('./images/Hiking.png')}
            />}
            </View>
        );

        if (this.state.user == null)
            return null;

        return(
            <View>
                {images}
                <TouchableOpacity style={styles.clearButton} onPress={this.editProfile}>
                    <Text>
                        Edit
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
    };

    editProfile = () => {
        const { navigation } = this.props;
        var userinfo={
            email: navigation.getParam('email')
        };
        this.props.navigation.navigate('EditProfile', userinfo);
    };

}
