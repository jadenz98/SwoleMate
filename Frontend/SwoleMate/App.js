import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createDrawerNavigator, DrawerActions} from 'react-navigation';
/*
import screens to be used in the navigator in the following way
import Homescreen from './.../Homescreen';
*/
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import Profile from './Screens/Profile';
import EditProfile from './Screens/EditProfile';
import Matches from './Screens/Matches';
import PickPhoto from './Screens/PickPhoto';
import FAQ from './Screens/FAQ';
import DrawerScreen from './Screens/DrawerScreen';

/*This is the first class that gets loaded, it basically takes the intial
page and places it on the stack to be displayed*/
export default class App extends React.Component {
  render() {
    return <DrawerNavigator />;
  }
}

const Drawer = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Profile: {
            screen: Profile
        }
    }, {
        contentComponent: DrawerScreen,
        drawerWidth: 1000
    }
);

const startStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Register: {
            screen: RegisterScreen
        }
    }, {
        initialRouteName: 'Login'
    }
);

const ProfileStack = createStackNavigator(
    {
        Profile: {
            screen: Profile
        },
        EditProfile: {
            screen: EditProfile
        },
        PickPhoto: {
            screen: PickPhoto
        }
    }, {
        initialRouteName: 'Profile'
    }
);

const homeStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        }
    }, {
        initialRouteName: 'Home'
    }
);

const matchesStack = createStackNavigator(
    {
        Matches: {
            screen: Matches
        }
    }
);

const FAQStack = createStackNavigator(
    {
        FAQ: {
            screen: FAQ
        }
    }
);

//creates navigation stack (push when new page, pop when previous page requested)
const DrawerNavigator = createDrawerNavigator(
    {
        Start: {
            screen: startStack,
            navigationOptions: {
                drawerLabel: () => null,
                drawerLockMode: 'locked-closed'
            },
        },
        Home: {
            screen: homeStack
        },
        Profile: {
            screen: ProfileStack
        },
        Matches: {
            screen: matchesStack
        },
        FAQ: {
            screen: FAQStack
        }
    },
    {//options go here
        initialRouteName: 'Start'
    }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
