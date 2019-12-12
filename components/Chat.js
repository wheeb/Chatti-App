import React, {Component} from 'react';
import {View, StyleSheet, Text, Button, Alert } from  'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import CustomView from './CustomView'

import Fire from '../Fire';



import {getLocationAsync, pickImageAsync, takePictureAsync} from "./mediaUtils";

class Chat extends Component{

    static navigationOptions = ({navigation}) => ({
        title: (navigation.state.params || {}).name || 'Chat',
    });
    state = {
        messages: [],
        typingText: null,
    };





    renderCustomView(props) {
        return <CustomView {...props} />
    }
    componentDidMount() {
        Fire.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }
    componentWillUnmount() {
        Fire.shared.off();
    }

    get user() {
        // Return our name and our UID for gifted to parse
        return {
            name: this.props.navigation.state.params.name,
            _id: Fire.shared.uid,
        };
    }





    renderFooter = props => {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>{this.state.typingText}</Text>
                </View>
            )
        }
        return null
    };
        //default message
        componentWillMount() {
            console.log(this.props.navigation.state.params.name);
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Tääl mä',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                   },
                },
                {
                    _id: 4,
                    text: '',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                    },
                    sent: true,
                    received: true,
                     location: {
                       latitude: 60.299646,
                       longitude:  25.060655,
                     },
                },
            ],
        })
        }



    render() {
        return(
            <View style={{ flex: 1, backgroundColor: '#fff' }}>



            <GiftedChat
                messages={this.state.messages}
                keyboardShouldPersistTaps='never'
                //frame for location data
                renderCustomView={this.renderCustomView}
                //onSend={messages => this.onSend(messages)}
                onSend={Fire.shared.send}
                user={this.user}
                renderUsernameOnMessage={true}
                timeTextStyle={{ left: { color: 'black' }, right: { color: 'yellow' } }}

            />



                <Button onPress={() => pickImageAsync(messages => this.onSend(messages))} title="photo" />
                <Button onPress={() => takePictureAsync(messages => this.onSend(messages))} title="camera" />
                <Button onPress={() => getLocationAsync(messages => this.onSend(messages))} title="mylocation" />


            </View>
        );
    }

    onSend(messages = []) {
        this.setState(previousState => ( {
            messages: GiftedChat.append(previousState.messages, messages)
        }))
    }


}

const styles = StyleSheet.create({
    footerContainer: {

    },
    footerText:{

    },


});

export default Chat;