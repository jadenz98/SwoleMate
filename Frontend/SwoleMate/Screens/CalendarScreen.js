import React from 'react';
import { TextInput, KeyboardAvoidingView, Dimensions, TouchableOpacity, View, Text, Image, Modal } from 'react-native';
import styles from './Styles/CalendarScreenStyles';
import globalStyles from './Styles/Global';
import Connector from '../Utils/Connector';
import { DrawerActions } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Loader from './Components/Loader';

export default class CalendarScreen extends React.Component {
    constructor(props) {
        super(props);
        const {navigator} = this.props;
        this.state = {
            eventModalVisible: false,
            dateModalVisible: false,
            isMounted: true,
            items: {},
            newEventTitle: '',
            newEventDate: '',

        };
        //this.onDayPress = this.onDayPress.bind(this);
    }

    //This sets the title on the top header
    static navigationOptions = ({ navigation }) => ({
        title: 'SwoleMate',
        headerLeft: (
            <TouchableOpacity style={globalStyles.hamburger} onPress = {() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                <Image
                    style={globalStyles.icon}
                    source={require('./images/hamburger.png')}
                />
            </TouchableOpacity>
        )
    });

    componentDidMount(){
        this.setState({isMounted: true});
    }

    componentWillUnmount () {
        if (this.itemLoaderTimeout)
            clearInterval(this.itemLoaderTimeout);
    }


    render () {
        return (
            this.state.isMounted ? (
                <View style={{flex: 1}}>
                    <Agenda
                        style={{flex: 1, flexDirection: 'row',zIndex:0}}
                        items={this.state.items}
                        loadItemsForMonth={this.loadItems.bind(this)}
                        renderItem={this.renderItem.bind(this)}
                        renderEmptyDate={this.renderEmptyDate.bind(this)}
                        rowHasChanged={this.rowHasChanged.bind(this)}
                    />

                    <TouchableOpacity
                        onPress={()=>{this.setState({eventModalVisible: true});}}
                        style={{position: 'absolute', height: 40, width: 40, top: Dimensions.get('window').height-150, left: Dimensions.get('window').width-75, zIndex: 1}}>
                        <Image
                            style={{height: 40, width: 40}}
                            source={require('./images/add.png')}/>

                    </TouchableOpacity>
                    <Modal
                        transparent={false}
                        visible={this.state.eventModalVisible}
                        onRequestClose={() => {}}
                    >
                        <View style={{marginTop: 22}}>
                            
                            <KeyboardAvoidingView style={{height: 100}}>
                                <Text>
                                    Add Event
                                </Text>

                                <TextInput
                                    ref={input => {this.nameInput = input }}
                                    placeholder='Event Title'
                                    style={globalStyles.inputBox}
                                    onChangeText={ (newEventTitle) => this.setState({newEventTitle})}
                                    autoCapitalize='words'
                                    textContentType='Title'
                                />
                                <View style={globalStyles.spacerSmall}/>
                                <TextInput
                                    value={this.state.newEventDate}
                                    ref={input => {this.nameInput = input }}
                                    placeholder='Date'
                                    style={globalStyles.inputBox}
                                    onTouchStart={()=> {
                                        this.setState({dateModalVisible: true});

                                    }}
                                    editable={false}
                                    //onChangeText={ (newEventDate) => this.setState({newEventDate})}
                                    //autoCapitalize='words'
                                    textContentType='Date'
                                />
                                <View style={globalStyles.spacerSmall}/>
                            </KeyboardAvoidingView>

                            <TouchableOpacity
                                style={globalStyles.btn}
                                onPress={() => {
                                    this.setState({eventModalVisible: false});
                                }}
                            >
                                <Text style={globalStyles.btnTextBlack}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.dateModalVisible}
                                mode='time'
                                onConfirm={(date)=>{
                                    this.setState({
                                        newEventDate: date.getHours().toString()+ ":" + date.getMinutes().toString(),
                                        dateModalVisible: false,
                                    });
                                }}
                                onCancel={()=>{
                                    this.setState({
                                        dateModalVisible: false,
                                    });
                                }}
                            >
                            </DateTimePicker>
                        </View>
                    </Modal>
                </View> ) : <Loader/>
        );
    }

    loadItems(day) {
        this.itemLoaderTimeout = setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            //console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}
