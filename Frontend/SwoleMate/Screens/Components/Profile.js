import React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import style from './Styles/ProfileStyles';
import Connector from "../../Utils/Connector";

import Loader from './Loader';

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
            user: null
        };

        Connector.get('/user', {email: props.email}, (res) => {
            const interests = res.interests;

            for(let i=0;i<interests.length;i++){
                if(interests[i] in this.renderImage){
                    this.renderImage[interests[i]]=true;
                }
            }

            this.setState({user: res});
        });
    }

    render () {
        if (this.state.user == null)
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

        return(
            <ScrollView>
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
                                    <Text>
                                        {user.bio}
                                    </Text>
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
                                <View style={style.textLine}>
                                    <Text>
                                        ~~Put Milestones here~~
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
