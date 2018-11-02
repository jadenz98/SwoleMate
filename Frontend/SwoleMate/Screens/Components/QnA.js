import React from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';

import styles from './Styles/FAQStyles';

export default class QnA extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isExpanded: false
        }
    }

    render () {
        let answerStyle = styles.answer;
        if (!this.state.isExpanded) {
            answerStyle = StyleSheet.flatten([styles.answer, {height: 0}])
        }

        return (
            <View style={styles.QnA}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            isExpanded: !this.state.isExpanded
                        });
                    }}
                >
                    <Text style={styles.question}>
                        {this.props.question}
                    </Text>
                    <Text style={answerStyle}>
                        {this.props.answer}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}