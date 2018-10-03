import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Connector from '../Utils/Connector';

//import stylesheet
import styles from './Styles/LoginScreenStyles';

export default class  CreateProfileScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  //This sets the title on the top header
  static navigationOptions = {
      title: 'Create Profile',
  };

  render(){
    return(
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          Create your Profile
        </Text>
      </View>
    )
  }
}
