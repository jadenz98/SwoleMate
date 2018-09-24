import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
/*
import screens to be used in the navigator in the following way
import Homescreen from './.../Homescreen';
import Loginscreen from './.../Homescreen';
*/

/*This is the first class that gets loaded, it basically takes the intial
page and places it on the stack to be displayed*/
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

//creates navigation stack (push when new page, pop when previous page requested)
const RootStack = createStackNavigator({
    /*{//different screens go here
      Home: Homescreen,
      Login: LoginScreen,
    },
    {//options go here
      initialRouteName: 'Login',
    }*/
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
