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

                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={globalStyles.contentContainer}>
                            <Text>
                                You find people to work out with by doing stuff. Wow!
                            </Text>

                            <View style={{alignItems: 'center'}}>
                                <Image
                                    source={require('./images/tutorial/image.jpg')}
                                    style={globalStyles.image}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <Image
                            source={require('./images/tutorial/image.jpg')}
                            style={globalStyles.centerImage}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}
