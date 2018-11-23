import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import globalStyles from './Styles/Global';
import style from './Styles/ProfileScreenStyles';
import { DrawerActions } from "react-navigation";

import Profile from './Components/Profile';

export default class ProfileScreen extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: props.navigation.dangerouslyGetParent().getParam('email'),
            isFocused: false
        };
    }

    //This sets the title on the top header
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        headerLeft: (
            <TouchableOpacity style={globalStyles.hamburger} onPress={() => {navigation.dispatch(DrawerActions.openDrawer());}}>
                <Image
                    style={globalStyles.icon}
                    source={require('./images/hamburger.png')}
                />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity style={style.editButton} onPress={() => {navigation.navigate('EditProfile')}}>
                <Text style={style.editText}>
                    Edit ->
                </Text>
            </TouchableOpacity>
        )
    });

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener("didFocus", () => {
                this.setState({ isFocused: true })
            }),
            this.props.navigation.addListener("willBlur", () => {
                this.setState({ isFocused: false })
            })
        ];
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }

    render () {
        if (!this.state.isFocused)
            return null;

        return (
            <Profile email={this.state.email} isSelf={true} />
        );
    }
}
