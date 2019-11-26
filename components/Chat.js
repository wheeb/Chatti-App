import React, {Component} from 'react';
import {View, StyleSheet } from  'react-native';
import {GiftedChat} from 'react-native-gifted-chat'
import Text from "react-native-web/dist/exports/Text";
import Fire from '../Fire';

class Chat extends Component{
    //navigationOptions = {name: 'poo'};

    static navigationOptions = ({navigation}) => ({
        title: (navigation.state.params || {}).name || 'Chat',
    });
    state = {
        messages: [],
    };

    get user(){
        return {
            name: this.props.navigation.state.params.name,
            _id: Fire.shared.uid,
        };
    }



    render() {
        return(
            <View>


            <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
        />
        <Text>
            asdasd
        </Text>
            </View>
        );
    }

    componentDidMount() {
        Fire.shared.on(message =>
        this.setState(previousState => ( {
            messages: GiftedChat.append(previousState.messages, message),
        }))
        );
    }
    componentWillUnmount() {
        Fire.shared,off();
    }


}

const styles = StyleSheet.create({});

export default Chat;