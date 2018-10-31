import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
/*
import screens to be used in the navigator in the following way
import Homescreen from './.../Homescreen';
*/
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import CreateProfileScreen from './Screens/CreateProfile';
import Profile from './Screens/Profile';
import EditProfile from './Screens/EditProfile';
import Matches from './Screens/Matches';
import Messages from './Screens/Messsages';
import PickPhoto from './Screens/PickPhoto';
import FAQ from './Screens/FAQ';

/*This is the first class that gets loaded, it basically takes the intial
page and places it on the stack to be displayed*/
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

//creates navigation stack (push when new page, pop when previous page requested)
const RootStack = createStackNavigator(
    {
      Login: {
        screen: LoginScreen,
      },
      Home: {
        screen: HomeScreen,
      },
      Register: {
        screen: RegisterScreen,
      },
      CreateProfile: {
        screen: CreateProfileScreen,
      },
      Profile: {
        screen: Profile,
      },
      EditProfile: {
        screen: EditProfile,
      },
      Matches: {
        screen: Matches,
      },
      Messages: {
        screen: Messages,
      },
      PickPhoto: {
        screen: PickPhoto,
      },
        FAQ: {
            screen: FAQ,
        }
    },
    {//options go here
      initialRouteName: 'Login',
    }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
