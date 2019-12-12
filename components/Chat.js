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
    //init firebase connection
    componentDidMount() {
        Fire.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }
    //disconnect firebase
    componentWillUnmount() {
        Fire.shared.off();
    }

    get user() {
        // return username and uid for gifted chat
        return {
            name: this.props.navigation.state.params.name,
            _id: Fire.shared.uid,
        };
    }
        //default messages
        componentWillMount() {
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
                keyboardShouldPersistTaps='always'
                //frame for location data and images
                renderCustomView={this.renderCustomView}
                //onSend={messages => this.onSend(messages)}
                onSend={Fire.shared.send}
                user={this.user}
                renderUsernameOnMessage={true}
                timeTextStyle={{ left: { color: 'black' }, right: { color: 'yellow' } }}

            />


                <View style={styles.buttonContainer} >
                    <Button style={styles.footButton} onPress={() => pickImageAsync(messages => this.onSend(messages))} title="photo" />
                    <Button style={styles.footButton} onPress={() => takePictureAsync(messages => this.onSend(messages))} title="camera" />
                    <Button style={styles.footButton} onPress={() => getLocationAsync(messages => this.onSend(messages, this.user))} title="my location" />
                </View>

            </View>
        );
    }

    onSend = (messages = []) => {
        const step = this.state.step + 1
        this.setState(previousState => {
            const sentMessages = [{ ...messages[0], sent: true, received: true }];
            console.log(messages);
            return {
                messages: GiftedChat.append(
                    previousState.messages,
                    sentMessages,
                ),
                step,
            }
        })
    }


}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-around',


    },
    footButton:{
        width: '30%'
    },


});

export default Chat;