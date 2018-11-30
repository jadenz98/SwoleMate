import React from 'react';
import globalStyles from './Styles/Global';

import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Picker,
    Modal,
    TouchableHighlight,
    Slider,
    Switch,
    StyleSheet
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import SelectMultiple from 'react-native-select-multiple';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import Loader from './Components/Loader';

import Connector from '../Utils/Connector';
import style from "./Components/Styles/ProfileStyles";

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            milestoneModalVisible: false,
            user: null,
            selectedInterests: [],
            cameraRollVisible: false,
            searchDistance: 1,
            isHidden: false,
            newMilestoneField: "",
            location: null,
        };

        this.interests = [
            'Swimming',
            'Running',
            'Lifting',
            'Hiking'
        ];

        const email = props.navigation.dangerouslyGetParent().getParam('email');
        Connector.get('/user', {email: email}, (res) => {
            this.setState({user: res});
            this.setState({location: res.favGym})
        });

        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);

        this.props.navigation.addListener(
          'didFocus',
          payload => {
            this.setState({is_updated:true});
          }
        );
    }

    //This sets any options for the header navigation bar
    static navigationOptions = {
        title: 'Edit Your Profile',
    };

    //callback for when user selects/deselects an option in the TouchMultiple component
    onSelectionsChange = (selectedInterests) => {
        let newUser = this.state.user;
        let interests = [];

        for (let i = 0; i < selectedInterests.length; i++) {
            interests.push(selectedInterests[i].value);
        }

        newUser.interests = interests;

        this.setState({
            user: newUser,
            selectedInterests: selectedInterests
        });
    };

    //sets the visibility of the interests modal
    setModalVisibility(visible) {
        this.setState({modalVisible: visible});
    }

    //sends updated user data to server to be stored in database
    save () {
        const user = this.state.user;

        Connector.post('/user/update', user, {email: user.email}, () => {
            this.props.navigation.pop();
        });
    }

    //cancelation of editing profile info will take the user to the previous screen (profile screen)
    cancel () {
        this.props.navigation.pop();
    }

    requestExternalStoragePermission = async () => {
        const { Location, Permissions } = Expo;
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            return Location.getCurrentPositionAsync({enableHighAccuracy: true});
        } else {
            throw new Error('Location permission not granted');
        }
    }

    //function to conditionally render map if fav gym set
    renderFavLocation () {
        if (!this.state.location) { //should be true if no gym set
            return <Text>No fav gym set</Text>;
        }
        return (
          <View style={{...StyleSheet.absoluteFillObject,}}    >
            <MapView
                liteMode
                style={{...StyleSheet.absoluteFillObject,}}
                region={{
                  latitude: this.state.user.gymLatitude,
                  longitude: this.state.user.gymLongitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
                /*{<Marker
                  coordinate={
                      latitude: this.state.user.gymLatitude,
                      longitude: this.state.user.gymLongitude,
                  }
                  title={this.state.user.favGym}
                />}*/
            />
          </View>
        );
    }

    setFavLocation = () => {
        const email = this.props.navigation.dangerouslyGetParent().getParam('email');
        Connector.get('/user', {email: email}, (res) => {
            this.setState({user: res});
            this.setState({location: res.favGym})
        });
    }

    render() {

        if (this.state.user == null)
            return <Loader/>;

        let milestones = this.state.user.milestones;
        let milestonesStyle = globalStyles.listText;
        if (!this.state.user.milestones || this.state.user.milestones.length === 0) {
            milestones = ["You have not defined any milestones yet"];
            milestonesStyle = StyleSheet.flatten([milestonesStyle, style.italics]);
        }
        console.log(milestones);

        return (
            <KeyboardAwareScrollView
                scrollEnabled={true}
                contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                enableOnAndroid={true}
            >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20, flexDirection: 'column'}}>
                    <TextInput
                        value={this.state.user.name}
                        placeholder='Name'
                        style={globalStyles.inputBox}
                        onChangeText={(name) => this.setState({user: {...this.state.user, name: name}})}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    <View style={globalStyles.spacerSmall}/>

                    <TextInput
                        value={this.state.user.email}
                        placeholder='Email'
                        style={globalStyles.inputBox}
                        onChangeText={(email) => this.setState({user: {...this.state.user, email: email}})}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    <View style={globalStyles.spacerSmall}/>

                    <TextInput
                        value={this.state.user.birthday}
                        placeholder='Birthday (mm/dd/yyyy)'
                        style={globalStyles.inputBox}
                        onChangeText={(birthday) => this.setState({user: {...this.state.user, birthday}})}
                        keyboardType='decimal-pad'
                        maxLength={10}
                    />

                    <View style={globalStyles.spacerSmall}/>

                    <TextInput
                        value={this.state.user.phone}
                        placeholder='Phone Number'
                        style={globalStyles.inputBox}
                        onChangeText={(phone) => this.setState({user: {...this.state.user, phone}})}
                        keyboardType='phone-pad'
                    />

                    <View style={{
                        borderWidth: 1,
                        margin: 5,
                        backgroundColor: 'white'
                    }}>
                        <Picker
                            selectedValue={this.state.user.sex}
                            style={{width: 150}}
                            onValueChange={(itemValue, itemIndex) => this.setState({user: {...this.state.user, sex: itemValue}})}
                        >
                            <Picker.Item label="Male" value="male"/>
                            <Picker.Item label="Female" value="female"/>
                            <Picker.Item label="Prefer not to specify" value="not_specified"/>
                        </Picker>
                    </View>

                    <TextInput
                        value={this.state.user.bio}
                        placeholder='Describe yourself and what you are looking for'
                        onChangeText={ (bio) => this.setState({user: {...this.state.user, bio}})}
                        style={{height: 200, width: 200, borderColor: 'black', backgroundColor: 'white', borderWidth: 1, padding: 5}}
                        multiline={true}
                    />

                    <View style={globalStyles.spacerSmall}/>

                    <TextInput
                        value={this.state.user.goal}
                        placeholder='Describe what you are working towards'
                        onChangeText={ (goal) => this.setState({user: {...this.state.user, goal}})}
                        style={{height: 50, width: 200, borderColor: 'black', borderWidth: 1, backgroundColor: 'white', padding: 5}}
                        multiline={true}
                    />

                    <View style={globalStyles.spacer}/>

                    <Text style={style.header}>
                        Milestones
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={globalStyles.listContainer}>
                            <List containerStyle={{marginTop: 0}}>
                                {
                                    milestones.map((l, i) => (
                                        <ListItem
                                            titleStyle={milestonesStyle}
                                            key={l}
                                            title={l}
                                            titleNumberOfLines={null}
                                            rightIcon = {
                                                <TouchableOpacity
                                                    onPress={
                                                        () => {
                                                            let milestones = this.state.user.milestones;
                                                            milestones.splice(i, 1);

                                                            this.setState({user: {...this.state.user, milestones}})
                                                        }
                                                    }

                                                    style={{width: 30, height: 30, alignItems: "center"}}
                                                >
                                                    {
                                                        this.state.user.milestones && this.state.user.milestones.length !== 0 ? (<Text style={{color: "red", fontSize: 20, fontWeight: "bold"}}>
                                                            X
                                                        </Text>) : (<View/>)
                                                    }
                                                </TouchableOpacity>
                                            }
                                        />
                                    ))
                                }
                            </List>
                        </View>
                    </View>

                    <View style={globalStyles.spacer}/>

                    <TouchableHighlight
                        onPress={() => {
                            this.setState({milestoneModalVisible: true});
                        }}
                        style={globalStyles.btnSecondary}
                    >
                        <Text style={globalStyles.btnText}>Add a milestone</Text>
                    </TouchableHighlight>

                    <Modal
                        transparent={false}
                        visible={this.state.milestoneModalVisible}
                        onRequestClose={() => {}}
                    >
                        <View style={{marginTop: 22, alignItems: "center"}}>
                            <TextInput
                                value={this.state.newMilestoneField}
                                placeholder='Describe a new milestone'
                                onChangeText={(text) => this.setState({newMilestoneField: text})}
                                style={{height: 50, width: 200, borderColor: 'black', borderWidth: 1, padding: 5}}
                                multiline={true}
                            />

                            <View style={globalStyles.spacer}/>

                            <TouchableOpacity
                                style={globalStyles.btnPrimary}
                                onPress={() => {
                                    const newList = this.state.user.milestones ? this.state.user.milestones : [];
                                    newList.push(this.state.newMilestoneField);
                                    this.setState({
                                        user: {
                                            ...this.state.user,
                                            milestones: newList
                                        },
                                        newMilestoneField: "",
                                        milestoneModalVisible: false
                                    });
                                }}
                            >
                                <Text style={globalStyles.btnTextBlack}>
                                    Add
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={globalStyles.btn}
                                onPress={() => {
                                    this.setState({newMilestoneField: "", milestoneModalVisible: false});
                                }}
                            >
                                <Text style={globalStyles.btnTextBlack}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <View style={globalStyles.spacer}/>

                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisibility(true);
                        }}
                        style={globalStyles.btnSecondary}
                    >
                        <Text style={globalStyles.btnText}>Edit Interests</Text>
                    </TouchableHighlight>

                    <Modal
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {}}
                    >
                        <View style={{marginTop: 22}}>
                            <SelectMultiple
                                items={this.interests}
                                selectedItems={this.state.selectedInterests}
                                onSelectionsChange={this.onSelectionsChange}
                            />
                            <TouchableOpacity
                                style={globalStyles.btn}
                                onPress={() => {
                                    this.setModalVisibility(!this.state.modalVisible);
                                }}
                            >
                                <Text style={globalStyles.btnTextBlack}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <View style={globalStyles.spacer}/>

                    <TouchableOpacity
                        style={globalStyles.btnSecondary}
                        onPress={()=> {
                            this.requestExternalStoragePermission();
                            this.props.navigation.navigate('PickPhoto',{email: this.props.navigation.getParam('email'), refresh: this.setFavLocation})}}
                    >
                        <Text style={globalStyles.btnText}>
                            Add Profile Picture
                        </Text>
                    </TouchableOpacity>

                    <View style={globalStyles.spacer}/>

                    <View style={{padding: 25}}>
                      <Text style={globalStyles.header}>
                          Favorite Gym Location
                      </Text>
                      {this.renderFavLocation()}
                      <View style={globalStyles.spacer}/>
                      <TouchableOpacity
                          style={globalStyles.btnSecondary}
                          onPress={()=> { this.props.navigation.navigate('LocationPicker',{email: this.props.navigation.getParam('email'), refresh: this.setFavLocation})}}
                      >
                          <Text style={globalStyles.btnText}>
                              Add a Workout Location
                          </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={globalStyles.spacer}/>

                    <Text style={globalStyles.header}>
                        Go ghost
                    </Text>
                    <View style={globalStyles.btn}>
                        <Switch
                            value={this.state.user.isGhost}
                            onValueChange={(switchState) => this.setState({user: {...this.state.user, isGhost: switchState}})}
                        />
                    </View>

                    <View style={globalStyles.spacer}/>

                    <Text style={globalStyles.header}>
                        Only show basic info
                    </Text>
                    <View style={globalStyles.btn}>
                        <Switch
                            value={this.state.user.basicInfo}
                            onValueChange={(switchState) => this.setState({user: {...this.state.user, basicInfo: switchState}})}
                        />
                    </View>

                    <View style={globalStyles.spacer}/>

                    <Text style={globalStyles.header}>
                      Set search distance
                    </Text>

                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#F5FCFF'
                    }}>
                        <Text>{this.state.user.searchDistance}</Text>
                        <Slider
                            value={this.state.user.searchDistance}
                            style={{ width: 300 }}
                            minimumValue={1}
                            maximumValue={100}
                            step={1}
                            onValueChange={(val) => this.setState({user: {...this.state.user, searchDistance: val}})}
                        />
                    </View>

                    <View style={globalStyles.spacer}/>
                    <View style={globalStyles.spacer}/>

                    <TouchableOpacity style={globalStyles.btnPrimary} onPress={this.save}>
                        <Text style={globalStyles.btnText}>
                            Save
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={globalStyles.btn} onPress={this.cancel}>
                        <Text style={globalStyles.btnTextBlack}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
