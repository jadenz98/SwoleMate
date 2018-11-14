import React from 'react';
import { TextInput, Modal, Alert, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { NavigationActions,DrawerActions } from 'react-navigation';

import style from './Styles/ProfileStyles';
import Connector from "../../Utils/Connector";
import { StyleSheet } from 'react-native';

import Loader from './Loader';
import {Font} from "expo";

import MaterialIcons from '../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import ProfileScreenStyles from '../Styles/ProfileScreenStyles';

export default class Profile extends React.Component {
    constructor (props) {
        super(props);

        this.renderImage={
            'Swimming': false,
            'Running': false,
            'Lifting': false,
            'Hiking': false,
        };

        this.state = {
            user: null,
            fontsAreLoaded: false,
            modalVisible: false,
            reportMessage: '',
            originalEmail: props.originalEmail,
        };

        Connector.get('/user', {email: props.email}, (res) => {
            const interests = res.interests;

            for(let i=0;i<interests.length;i++){
                if(interests[i] in this.renderImage){
                    this.renderImage[interests[i]]=true;
                }
            }

            res.milestones = [
                "Ran a race",
                "Got up from the couch",
                "Got out of bed today",
                "Ran a Triathlon",
                "I went and walked in the rain to get a pizza because my team was dying of hunger"
            ];

            this.setState({user: res});
        });
    }

    async componentDidMount(){
        await Font.loadAsync({
            MaterialIcons
        });
        this.setState({
            fontsAreLoaded: true
        });
    }
sendReport = () =>{
            Connector.post('/user/report',{email: this.props.originalEmail, emailReported: this.state.user.email, reportMessage: this.state.reportMessage},{email: this.state.originalEmail},(res)=>{
                this.setState({modalVisible: false});
            });
        }
    render () {
        if (this.state.user == null || !this.state.fontsAreLoaded)
            return <Loader/>;

        const user = this.state.user;

        // Dynamically set the profile picture
        let profileImage;
        if (user.photoData) {
            profileImage =
                <Image
                    style={style.profileImage}
                    source={{uri: `data:image/jpeg;base64,${this.state.user.photoData}`}}
                />;
        } else {
            profileImage =
                <Image
                    style={style.profileImage}
                    source={require('../images/generic-profile-picture.png')}
                />;
        }
        report = () =>{
            Alert.alert(
                'Report',
                'Are you sure you want to report this person',
                [
                    {text: 'Report', onPress: () => this.setState({modalVisible: true})},
                    {text: 'Cancel'}
                ]
            )
        }
        
        displayModal = () =>{
            this.setState({modalVisible: true});
        }
        if(!this.props.isSelf){
            
            reportButton = (
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={style.button} onPress={report}>
                        <Text>
                            Report
                        </Text>
                    </TouchableOpacity>
                </View>
            );
            
        }
        else{
            reportButton = null;
        }
        const interestImages = (
            <View style={{flexDirection: 'row'}}>
                {this.renderImage['Swimming'] && <Image source={require('../images/Swimming.png')}
                />}
                {this.renderImage['Running'] && <Image source={require('../images/Running.png')}
                />}
                {this.renderImage['Lifting'] && <Image source={require('../images/Lifting.png')}
                />}
                {this.renderImage['Hiking'] && <Image source={require('../images/Hiking.png')}
                />}
            </View>
        );

        let bioText;
        if (!user.bio || user.bio === "") {
            bioText = (
                <Text style={style.italics}>
                    This user has not written a bio yet!
                </Text>
            );
        } else {
            bioText = (
                <Text>
                    {user.bio}
                </Text>
            );
        }

        let milestones = user.milestones;
        let milestonesStyle = style.listText;
        if (!user.milestones || user.milestones.length === 0) {
            milestones = ["This user does not have any milestones yet!"];
            milestonesStyle = StyleSheet.flatten([milestonesStyle, style.italics]);
        }

        return(
            <ScrollView>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}>
                    <View>
                        <TextInput
                            placeholder='Please explain why you are reporting this person'
                            onChangeText={ (reportMessage) => this.setState({reportMessage})}
                            style={{height: 200, width: 200, borderColor: 'black', borderWidth: 1}}
                            multiline={true}
                        />
                        <TouchableOpacity onPress={this.sendReport}>
                            <Text>
                                Send report
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={{flex:1, alignItems: 'stretch', flexDirection: 'column'}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.username}>
                            {user.name}
                        </Text>

                        {profileImage}
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={style.profileInfo}>
                            <View style={{alignItems: 'center', marginBottom: 5}}>
                                {interestImages}
                            </View>

                            <Text style={style.header}>
                                Bio
                            </Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={style.textBox}>
                                    {bioText}
                                </View>
                            </View>

                            <View style={style.spacer} />

                            {/* Do we Keep the phone number????
                            <Text style={style.header}>
                                Phone Number
                            </Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={style.textLine}>
                                    <Text>
                                        {user.phone}
                                    </Text>
                                </View>
                            </View>

                            <View style={style.spacer} />
                            */}

                            <Text style={style.header}>
                                Milestones
                            </Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={style.listContainer}>
                                    <List containerStyle={{marginTop: 0}}>
                                        {
                                            milestones.map((l) => (
                                                this.state.fontsAreLoaded ? (<ListItem
                                                    titleStyle={milestonesStyle}
                                                    key={l}
                                                    title={l}
                                                    hideChevron
                                                    titleNumberOfLines={null}
                                                />): null
                                            ))
                                        }
                                    </List>
                                </View>
                            </View>
                            {reportButton}
                            <View style={style.spacer} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
