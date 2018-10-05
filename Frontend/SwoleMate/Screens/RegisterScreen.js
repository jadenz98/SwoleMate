import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Picker } from 'react-native';
import Connector from '../Utils/Connector'

//import stylesheet
import styles from './Styles/LoginScreenStyles';

export default class RegisterScreen extends React.Component{
    constructor(props){
      super(props);
      this.state={
        newUsername: '',
        newPassword: '',
        passwordConfirm: '',
        email: '',
        name: '',
        sex: '',
        birthday: '',
        phone_number: '',
        bio: '',
        latitude: null,
        longitude: null,
      };
        this.getLocation();
    }

    //Function to get user's location
    getLocation(){
        //get user's location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                });
            },
            (error) => alert(error.message),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
    }

    //This sets the title on the top header
    static navigationOptions = {
        title: 'Register',
    };

    render(){
        if (this.state.latitude == null || this.state.longitude == null)
            return null;

        return(
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
              Register new Swolemate account here
            </Text>

            <TextInput
              /*placeholder='Username'
              style={styles.textbox}
              onChangeText={ (newUsername) => this.setState({newUsername})}
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='username'*/
            />

            <TextInput
              ref={input => {this.emailInput = input }}
              placeholder='Email'
              style={styles.textbox}
              onChangeText={ (email) => this.setState({email})}
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
            />

            <TextInput
              ref={input => {this.passwordInput = input }}
              placeholder='Password'
              style={styles.textbox}
              onChangeText={ (newPassword) => this.setState({newPassword})}
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={15}
              secureTextEntry={true}
              textContentType='password'
            />

            <TextInput
              ref={input => {this.passConfirmInput = input }}
              placeholder='Confirm Password'
              style={styles.textbox}
              onChangeText={ (passwordConfirm) => this.setState({passwordConfirm})}
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={15}
              secureTextEntry={true}
              textContentType='password'
            />

            <Text>
              Create Profile
            </Text>

            <TextInput
              ref={input => {this.nameInput = input }}
              placeholder='Name'
              style={styles.textbox}
              onChangeText={ (name) => this.setState({name})}
              autoCapitalize='words'
              textContentType='name'
            />

            <Picker
              selectedValue={this.state.sex}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => this.setState({sex: itemValue})}>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Prefer not to specify" value="not_specified" />
              <Picker.Item label="Apache attack helicopter" value="not_specified" />
            </Picker>

            <TextInput
              ref={input => {this.birthdayInput = input }}
              placeholder='Birthday (mm/dd/yyyy)'
              style={styles.textbox}
              onChangeText={ (birthday) => this.setState({birthday})}
              keyboardType='decimal-pad'
              maxLength={10}
            />

            <TextInput
              ref={input => {this.phoneInput = input }}
              placeholder='Phone number'
              style={styles.textbox}
              onChangeText={ (phone_number) => this.setState({phone_number})}
              keyboardType='phone-pad'
            />

            <Text>
              Add a bio
            </Text>

            <TextInput
              placeholder='Describe what you are looking for'
              onChangeText={ (bio) => this.setState({bio})}
              style={{height: 200, width: 200, borderColor: 'black', borderWidth: 1}}
              multiline={true}
            />

            <TouchableOpacity style={styles.button} onPress={this.registerAccount}>
              <Text>
                Register Account
              </Text>
            </TouchableOpacity>
          </View>
        )
    }

    //register function
    registerAccount = () => {
      if(this.validateInput()){
        //alert('success');
        Connector.post("/user/register", {
            email:  this.state.email,
            password: this.state.newPassword,
            name: this.state.name,
            birthday: this.state.birthday,
            phone: this.state.phone_number,
            bio: this.state.bio,
            location: {
                coordinates: [
                    this.state.longitude,
                    this.state.latitude
                ],
                type: 'Point'
            }
        }, {}, (response) => {
            console.log(response);
            if(response.success){ //Server return success on register
              //this is how userinfo will be passed to other screens
              var userinfo = {
                  name: this.state.name,
                  email: this.state.email
              };
              //eventually change 'Home' to 'CreateProfile'
              this.props.navigation.navigate('Home', userinfo);
            } else{ //Server returned failure on register (should mean email is taken)
              this.emailInput.clear(); //Clears email and both password TextInput's and displays alert
              this.passwordInput.clear();
              this.passConfirmInput.clear();
              alert('Email is already registered to an account.\nTry again');
            }
        });
      } else {
          //alert('Input not valid');
      }
    };

    //Function to test all inputs
    validateInput(){
      //make sure email is not empty and valid
      var emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(this.state.email == '' | !emailRGEX.test(this.state.email)){
        this.setState({ email: '' });
        this.emailInput.clear();
        alert('Email is not valid');
        return false;
      }
      //make sure password and passwordConfirm match and not empty
      if(this.state.newPassword == '' | this.state.passwordConfirm == ''){
        this.setState({
          newPassword: '',
          passwordConfirm: '',
        });
        this.passwordInput.clear();
        this.passConfirmInput.clear();
        alert('Password is not valid');
        return false;
      }
      if(this.state.newPassword != this.state.passwordConfirm){
        this.setState({
          newPassword: '',
          passwordConfirm: '',
        });
        this.passwordInput.clear();
        this.passConfirmInput.clear();
        alert('Passwords do not match');
        return false;
      }
      //make sure name is not empty
      if(this.state.name == ''){
        alert('Name is not valid');
        return false;
      }
      //make sure birthday is not empty and is valid
      var birthdayRGEX = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
      if(this.state.birthday == '' | !birthdayRGEX.test(this.state.birthday)){
        this.setState({ birthday: ''});
        alert('Birthday is not valid');
        return false;
      }

      //make sure phone number is not empty and is valid
      var phoneRGEX = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
      if(this.state.phone_number == '' | !phoneRGEX.test(this.state.phone_number)){
        this.setState({ phone_number: ''});
        alert('Phone number is not valid');
        return false;
      }

      return true;
    }
}
