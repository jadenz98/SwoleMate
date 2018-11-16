import React from 'react';
import {TouchableOpacity, Text, TextInput, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import Connector from '../Utils/Connector'

import Loader from './Components/Loader';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from './Styles/LoginScreenStyles';
import globalStyles from './Styles/Global';


export default class  LocationPicker extends React.Component {
    constructor(props) {
      super(props);
      this.state= {
          email: props.navigation.dangerouslyGetParent().getParam('email')
      }
    }

    static navigationOptions = {
        title: 'Location Picker',
    };

    render () {
      return(
        <ScrollView contentContainerStyle={{flexGrow: 1}}
                    scrollEnabled={false}
                    keyboardShouldPersistTaps='handled'>
          <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            autoFocus={true}
            returnKeyType={'search'}
            renderDescription={row => row.description}
            fetchDetails={true}
            onPress={(data, details = null) => {
              const favLocation = {
                  favGym: data.description,
                  gymLatitude: details.geometry.location.lat,
                  gymLongitude: details.geometry.location.lng,
              }
              Connector.post('/user/update', favLocation, {email: this.state.email}, () => {
                  this.props.navigation.pop();
              });
           }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyAJxKt_3yf9YZ_48BlIwYNmZwq99yUgsRg',
              language: 'en', // language of the results
            }}
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            styles={{
              textInputContainer: {
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth:0
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
            }}
            currentLocation={false}
          />
      </ScrollView>
      );
    }


}
