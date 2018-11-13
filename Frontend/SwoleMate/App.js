import React from 'react';
import { StyleSheet } from 'react-native';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import EditProfile from './Screens/EditProfile';
import Matches from './Screens/Matches';
import Messages from './Screens/Messsages';
import PickPhoto from './Screens/PickPhoto';
import FAQ from './Screens/FAQ';
import OtherProfileScreen from "./Screens/OtherProfileScreen";
import Reset from './Screens/ResetScreen';
import ResetConfirm from './Screens/resetConfirmation';

/*This is the first class that gets loaded, it basically takes the intial
page and places it on the stack to be displayed*/
export default class App extends React.Component {
  render() {
    return <DrawerNavigator />;
  }
}

const startStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Register: {
            screen: RegisterScreen
        },
        Reset: {
            screen: Reset
        },
        ResetConfirm: {
          screen: ResetConfirm
        }
    }, {
        initialRouteName: 'Login'
    }
);

const ProfileStack = createStackNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen
        },
        EditProfile: {
            screen: EditProfile
        },
        PickPhoto: {
            screen: PickPhoto
        }
    }, {
        initialRouteName: 'ProfileScreen'
    }
);

const homeStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        ExpandedProfile: {
            screen: OtherProfileScreen
        }
    }, {
        initialRouteName: 'Home'
    }
);

const matchesStack = createStackNavigator(
    {
        Matches: {
            screen: Matches
        },
        Messages: {
            screen: Messages,
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
        },
        Logout: {
            screen: startStack,
            navigationOptions: {
                drawerLockMode: 'locked-closed'
            }
        }
    },
    {//options go here
        initialRouteName: 'Logout'
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
