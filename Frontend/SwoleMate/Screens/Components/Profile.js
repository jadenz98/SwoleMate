import React from 'react';
import { TextInput, Modal, Alert, Text, View, Image, ScrollView, TouchableOpacity, FlatList, Platform } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import style from './Styles/ProfileStyles';
import globalStyles from "../Styles/Global";
import Connector from "../../Utils/Connector";
import { StyleSheet } from 'react-native';

import MapView from 'react-native-maps'

import Loader from './Loader';
import {Font} from "expo";

import MaterialIcons from '../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';

export default class Profile extends React.Component {
    constructor (props) {
        super(props);

        this.renderImage = {
            'Swimming': false,
            'Running': false,
            'Lifting': false,
            'Hiking': false
        };

        this.state = {
            user: null,
            fontsAreLoaded: false,
            modalVisible: false,
            shareUserModalVisible: false,
            reportMessage: '',
            originalEmail: props.originalEmail,
            matches: null,
            id: null,
            isSharedProfile: false,
        };

        Connector.get('/user', {email: this.props.email}, (res) => {
            const interests = res.interests;

            for (let i = 0; i < interests.length; i++) {
                if (interests[i] in this.renderImage) {
                    this.renderImage[interests[i]] = true;
                }
            }

            this.setState({user: res});
        });

        Connector.get('/user/matches', {email: this.props.originalEmail}, (res) => {
            this.setState({
                matches: res,
            });
        });
    }

    async componentDidMount () {
        if(Platform.OS === 'ios'){
            await Font.loadAsync({
                'Material Icons': require('../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf')
            });
            this.setState({
                fontsAreLoaded: true
            });
        } else {
            await Font.loadAsync({
                MaterialIcons
            });
            this.setState({
                fontsAreLoaded: true
            });
        }
    }

    getMatches = () => {
        const matches = this.state.matches;
        if (matches == null || !matches) {
            return <Text>No Matches to load</Text>;
        }

        //for each match of the current user, set the appropriate image source depending on whether the user has a chosen profile image
        for (let i = 0; i < matches.length; i++) {
            matches[i].key = matches[i].email;
            if(matches[i].photoData === undefined){
                matches[i].imgSrc = require('../images/generic-profile-picture.png');
            } else {
                const encodedData=matches[i].photoData;
                matches[i].imgSrc = {uri: `data:image/jpeg;base64,${encodedData}`};
            }
        }
        return (
            <View style={globalStyles.background}>
                <List>
                    <FlatList
                        data={matches}
                        renderItem={({item}) =>
                            // once fonts are loaded, the the list item components for the data above are rendered
                            this.state.fontsAreLoaded ? (
                                <ListItem
                                    roundAvatar
                                    avatar = {item.imgSrc}
                                    onPress={()=> {
                                        Connector.get('/user', {email: this.props.originalEmail}, (res) => {
                                            Connector.post('/user/conversation', {sender: this.props.originalEmail, re: item.email, msg: res.name + ' has shared a profile: #link[' + this.state.user.email + ':@' + this.state.user.name + ']'}, {email: this.props.originalEmail}, (res) => {
                                                console.log(res);
                                            });
                                            Alert.alert(
                                                'Profile Shared',
                                                'This profile was shared to ' + item.name,
                                                [
                                                    {text: 'Okay', onPress: () => this.setState({shareUserModalVisible: false})}
                                                ]
                                            )
                                        });
                                    }
                                    }
                                    title={item.name}>
                                </ListItem>
                            ) : null
                        }
                    />
                </List>
            </View>
        );
    };

    sendReport = () => {
        Connector.post(
            '/user/report', {
                email: this.props.originalEmail,
                emailReported: this.state.user.email,
                reportMessage: this.state.reportMessage
            }, {
                email: this.state.originalEmail
            }, (res) => {
                this.setState({modalVisible: false});
            }
        );
    };

    confirmReport = () =>{
        Alert.alert(
            'Report',
            'Are you sure you want to report this person',
            [
                {text: 'Report', onPress: () => this.setState({modalVisible: true})},
                {text: 'Cancel'}
            ]
        )
    };

    shareProfile = () => {
        Alert.alert('Share', 'Share this profile', [{text: 'Okay'}])
    };

    renderFavLocation = () => {
        if (!this.state.user.favGym) { //should be true if no gym set
            return <Text>No fav gym set</Text>;
        }
        return (
            <View style={{...StyleSheet.absoluteFillObject,}}    >
                <MapView
                    liteMode
                    style={{...StyleSheet.absoluteFillObject,flex:1}}
                    region={{
                        latitude: this.state.user.gymLatitude,
                        longitude: this.state.user.gymLongitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                />
            </View>
        );
    };

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
        } else if (user.photoUrl) {
            profileImage = <Image
                style={style.profileImage}
                source={{uri: user.photoUrl}}
            />;
        } else {
            profileImage =
                <Image
                    style={style.profileImage}
                    source={require('../images/generic-profile-picture.png')}
                />;
        }

        let acceptRejectButtons;
        if(!this.props.isSelf && this.props.isSharedProfile){
            acceptRejectButtons = (
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity
                        style={globalStyles.btnPrimary}
                        onPress={() => Connector.post('/user/matches',{"email1": this.state.originalEmail, "email2": this.state.user.email, "swipe": "true" },undefined,(res) => {
                            console.log("Match Status: " + res.success);
                            if (res.success) {
                                alert('You have a match');
                            }
                        })}
                    >
                        <Text style={globalStyles.btnText}>Request Match</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            acceptRejectButtons = null;
        }

        let shareButton;
        if(!this.props.isSelf && !this.props.isSharedProfile){
            shareButton = (
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={globalStyles.btnSecondary} onPress={() => this.setState({shareUserModalVisible: true})}>
                        <Text style={globalStyles.btnText}>
                            Share this Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            shareButton = null;
        }

        let reportButton;
        if(!this.props.isSelf && !this.props.isSharedProfile){
            reportButton = (
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={globalStyles.btnDanger} onPress={this.confirmReport}>
                        <Text style={globalStyles.btnText}>
                            Report
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
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
        let favGymMap;
        let goalText;
        let milestonesText;
        let milestones = user.milestones;
        let milestonesStyle = style.listText;
        if(this.props.isSelf) {
            favGymMap = (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={globalStyles.header}>
                        Favorite Gym Location
                    </Text>
                    <View style={{width: 200, height: 200, padding: 5}}>

                        {this.renderFavLocation()}
                        <View style={globalStyles.spacer}/>

                    </View>
                </View>
            );

            if (!user.goal || user.goal === "") {
                goalText = (
                    <View>
                        <Text style={style.header}>
                            Goal
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={style.textBox}>
                                <Text style={style.italics}>
                                    You have not declared a goal yet!
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            } else {
                goalText = (
                    <View>
                        <Text style={style.header}>
                            Goal
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={style.textBox}>
                                <Text>
                                    {user.goal}
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            }

            if (!user.milestones || user.milestones.length === 0) {
                milestones = ["You do not have any milestones yet!"];
                milestonesStyle = StyleSheet.flatten([milestonesStyle, style.italics]);
            }

            milestonesText = (
                <View>
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
                </View>
            );

        } else { //if this.props isnt self

            if(user.basicInfo){
                favGymMap = null;
            } else {
                favGymMap = (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={globalStyles.header}>
                            Favorite Gym Location
                        </Text>
                        <View style={{width: 200, height: 200, padding: 5}}>

                            {this.renderFavLocation()}
                            <View style={globalStyles.spacer}/>

                        </View>
                    </View>
                );
            }
            if(user.basicInfo) {
                goalText = null;
            } else if (!user.goal || user.goal === "") {
                goalText = (
                    <View>
                        <Text style={style.header}>
                            Goal
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={style.textBox}>
                                <Text style={style.italics}>
                                    This user has not declared a goal yet!
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            } else {
                goalText = (
                    <View>
                        <Text style={style.header}>
                            Goal
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={style.textBox}>
                                <Text>
                                    {user.goal}
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            }

            if (!user.milestones || user.milestones.length === 0) {
                milestones = ["This user does not have any milestones yet!"];
                milestonesStyle = StyleSheet.flatten([milestonesStyle, style.italics]);
            }

            if (user.basicInfo) {
                milestonesText = null;
            } else {
                milestonesText = (
                    <View>
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
                    </View>
                );
            }
        }

        return (
            <ScrollView>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}
                >
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
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.shareUserModalVisible}
                    onRequestClose={() => this.setState({shareUserModalVisible: false})}
                >
                    <View>
                        {this.getMatches()}
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

                            {goalText}

                            <View style={style.spacer} />

                            {milestonesText}

                            {favGymMap}
                            <View style={style.spacer} />

                            {acceptRejectButtons}

                            <View style={style.spacer} />

                            {shareButton}

                            <View style={style.spacer} />

                            {reportButton}
                            <View style={style.spacer} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
