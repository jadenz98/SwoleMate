import React from 'react';
import { View, Image } from 'react-native';

export default class Loader extends React.Component {
    render () {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../images/loader.gif')} />
            </View>
        );
    }
}