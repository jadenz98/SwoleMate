import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import QnA from './Components/QnA';
import globalStyles from './Styles/Global';
import {DrawerActions} from "react-navigation";
import style from "./Components/Styles/ProfileStyles";

export default class TutorialScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    //This sets the title on the top header
    static navigationOptions = ({ navigation }) => ({
        title: 'How to Use SwoleMate',
        headerLeft:
            <TouchableOpacity style={globalStyles.hamburger} onPress = {() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                <Image
                    style={globalStyles.icon}
                    source={require('./images/hamburger.png')}
                />
            </TouchableOpacity>
    });

    render () {
        return (
            <ScrollView>
                <View style={{flex:1, alignItems: 'stretch', flexDirection: 'column'}}>
                    <View style={globalStyles.spacer}/>

                    <View style={{alignItems: 'center'}}>
                        <Text style={globalStyles.header}>
                            Finding People to Work Out With
                        </Text>
                    </View>

                    <View style={globalStyles.spacer}/>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={globalStyles.contentContainer}>
                            <Text>
                                You can find potential people to work out with on the "Home" screen. Here you can swipe right to try to match with them, or you can swipe left if you think that they are not a suitable work out partner.
                            </Text>

                            <View style={{alignItems: 'center'}}>
                                <Image
                                    source={require('./images/tutorial/matching.jpg')}
                                    style={globalStyles.screenShotImage}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={globalStyles.spacer}/>

                    <View style={{alignItems: 'center'}}>
                        <Text style={globalStyles.header}>
                            Making Your Profile
                        </Text>
                    </View>

                    <View style={globalStyles.spacer}/>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={globalStyles.contentContainer}>
                            <Text>
                                On the "Profile" screen, you can create your profile that you want to show to other users. Make sure to specify as much as you can in the "Edit" screen so that other users can get a good idea of who you are.
                            </Text>

                            <View style={{alignItems: 'center'}}>
                                <Image
                                    source={require('./images/tutorial/profile.jpg')}
                                    style={globalStyles.screenShotImage}
                                    resizeMode="contain"
                                />

                                <Image
                                    source={require('./images/tutorial/editProfile.jpg')}
                                    style={globalStyles.screenShotImage}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={globalStyles.spacer}/>

                    <View style={{alignItems: 'center'}}>
                        <Text style={globalStyles.header}>
                            Send Messages to Your Matched Users
                        </Text>
                    </View>

                    <View style={globalStyles.spacer}/>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={globalStyles.contentContainer}>
                            <Text>
                                Get in touch with you matches by using the "Matches" screen. You can send messages and figure out a time and place to exercise.
                            </Text>

                            <View style={{flex: .5, alignItems: 'center'}}>
                                <Image
                                    source={require('./images/tutorial/conversations.jpg')}
                                    style={globalStyles.screenShotImage}
                                    resizeMode="contain"
                                />

                                <Image
                                    source={require('./images/tutorial/message.jpg')}
                                    style={globalStyles.screenShotImage}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={globalStyles.spacer}/>
                </View>
            </ScrollView>
        );
    }
}
