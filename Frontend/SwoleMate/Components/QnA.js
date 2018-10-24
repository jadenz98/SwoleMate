import React from 'react';

import {Text, View} from 'react-native';

import styles from '../Screens/Styles/FAQStyles';

export default class QnA extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <View style={styles.QnA}>
                <Text style={styles.question}>
                    {this.props.question}
                </Text>
                <Text style={styles.answer}>
                    {this.props.answer}
                </Text>
            </View>
        );
    }
}