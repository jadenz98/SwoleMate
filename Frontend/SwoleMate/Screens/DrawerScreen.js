import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View} from 'react-native';
import { DrawerActions } from 'react-navigation';

class DrawerScreen extends React.Component {
    constructor (props) {
        super(props);

        console.log("test!!!!");
    }

    render () {
        return (
            <View>
                <ScrollView>
                    <View>
                        <View>
                            <Text>
                                Home
                            </Text>
                        </View>
                        <View>
                            <Text>
                                About
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Contact
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default DrawerScreen;