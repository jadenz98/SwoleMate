import React from 'react';
import { TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Dimensions, TouchableOpacity, View, Text, Image, Modal } from 'react-native';
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
            email: props.navigation.dangerouslyGetParent().getParam('email'),
            eventModalVisible: false,
            dateModalVisible: false,
            startTimeModalVisible: false,
            endTimeModalVisible: false,
            isMounted: true,
            eventsArray: [],
            items: {},
            newEventTitle: '',
            newEventDate: '',
            newEventStartTime: '',
            newEventEndTime: '',
            DateTimePickerMode: 'date',
            newEventStartMinutes: 0,
            newEventEndMinutes: 0,
            newEventLength: 0,
        };
        Connector.get('/user/calendar',{email: this.state.email}, (res) => {
            this.setState({
                eventsArray: res
            });
        });
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

    createEvent = () => {
        let event = {};
        event.Title=this.state.newEventTitle;
        //startTime and endTime represent the time of day in minutes
        event.startTime=this.state.newEventStartTime;
        event.endTime=this.state.newEventEndTime;
        event.date=this.state.newEventDate;
        event.length=(parseInt(this.state.newEventEndMinutes)-parseInt(this.state.newEventStartMinutes));

        Connector.post('/user/calendar',{'email': this.state.email, 'event': event},undefined,(res) => {
            console.log(res);
        });



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
                            
                            {/*<KeyboardAvoidingView style={{height: 100}}>*/}
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
                                <TouchableOpacity
                                    onPress={()=> {
                                        this.setState({
                                            startTimeModalVisible: true,
                                            DateTimePickerMode: 'time',
                                        });

                                    }}
                                >
                                    <TextInput
                                        value={this.state.newEventStartTime}
                                        ref={input => {this.nameInput = input }}
                                        placeholder='Start Time'
                                        style={globalStyles.inputBox}
                                        pointerEvents='none'
                                        editable={false}
                                        //onChangeText={ (newEventDate) => this.setState({newEventDate})}
                                        //autoCapitalize='words'
                                        textContentType='Time'
                                    />
                                </TouchableOpacity>
                                <View style={globalStyles.spacerSmall}/>

                                <TouchableOpacity
                                    onPress={()=> {
                                        this.setState({
                                            endTimeModalVisible: true,
                                            DateTimePickerMode: 'time',
                                        });

                                    }}
                                >
                                    <TextInput
                                        value={this.state.newEventEndTime}
                                        ref={input => {this.nameInput = input }}
                                        placeholder='End Time'
                                        style={globalStyles.inputBox}
                                        pointerEvents='none'
                                        editable={false}
                                        //onChangeText={ (newEventDate) => this.setState({newEventDate})}
                                        //autoCapitalize='words'
                                        textContentType='Time'
                                    />
                                </TouchableOpacity>
                                <View style={globalStyles.spacerSmall}/>
                                
                                <TouchableOpacity
                                    onPress={()=> {
                                        this.setState({
                                            dateModalVisible: true,
                                            DateTimePickerMode: 'date',
                                        });

                                    }}
                                >
                                    <TextInput
                                        value={this.state.newEventDate}
                                        ref={input => {this.nameInput = input }}
                                        placeholder='Date of Event'
                                        style={globalStyles.inputBox}
                                        pointerEvents='none'
                                        editable={false}
                                        //onChangeText={ (newEventDate) => this.setState({newEventDate})}
                                        //autoCapitalize='words'
                                        textContentType='Date'
                                    />
                                </TouchableOpacity>
                                <View style={globalStyles.spacerSmall}/>
                            {/*</KeyboardAvoidingView>*/}
                            
                            <View style={globalStyles.spacerSmall}/>
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

                            <View style={globalStyles.spacerSmall}/>
                            <TouchableOpacity
                                style={globalStyles.btn}
                                onPress={() => {
                                    var eventLength=this.state.newEventEndMinutes-this.state.newEventStartMinutes;
                                    if(eventLength<1){
                                        alert("End time must be larger than start time");
                                    }
                                    else{
                                        this.setState({
                                            eventModalVisible: false,
                                        });
                                        this.createEvent();
                                    }
                                }}
                            >
                                <Text style={globalStyles.btnTextBlack}>
                                    Create Event
                                </Text>
                            </TouchableOpacity>
                            
                            {/*This component picks the date*/}
                            <DateTimePicker
                                isVisible={this.state.dateModalVisible}
                                mode={this.state.DateTimePickerMode}
                                onConfirm={(date)=>{
                                    this.setState({
                                        newEventDate: (date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()),
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

                            {/*This component picks the start time*/}
                            <DateTimePicker
                                isVisible={this.state.startTimeModalVisible}
                                mode={this.state.DateTimePickerMode}
                                is24Hour={false}
                                onConfirm={(date)=>{
                                    this.setState({
                                        newEventStartTime: ((date.getHours()%12)==0 ? 12:(date.getHours()%12)) + ":" + date.getMinutes(),
                                        newEventStartMinutes: ((date.getHours()*60)+(date.getMinutes())),
                                        startTimeModalVisible: false,
                                    });
                                }}
                                onCancel={()=>{
                                    this.setState({
                                        startTimeModalVisible: false,
                                    });
                                }}
                            >
                            </DateTimePicker>

                            {/*This component picks the end time*/}
                            <DateTimePicker
                                isVisible={this.state.endTimeModalVisible}
                                mode={this.state.DateTimePickerMode}
                                is24Hour={false}
                                onConfirm={(date)=>{
                                    this.setState({
                                        newEventEndTime: ((date.getHours()%12)==0 ? 12:(date.getHours()%12)) + ":" + date.getMinutes(),
                                        newEventEndMinutes: ((date.getHours()*60)+(date.getMinutes())),
                                        endTimeModalVisible: false,
                                    });
                                }}
                                onCancel={()=>{
                                    this.setState({
                                        endTimeModalVisible: false,
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
            /*const newItems={};
            for(let i=0;i<this.state.eventsArray.length;i++){
                newItems[eventsArray[i].date] = eventsArray[i].title;
            }*/


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
        //console.log(`Load Items for ${day.year}-${day.month}`);
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
