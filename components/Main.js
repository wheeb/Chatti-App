import React, {Component} from 'react';

import {View, TextInput, StyleSheet, Text, TouchableOpacity} from  'react-native';
import AppContainer from "../App";
//const {navigate} = props.navigation;

class Main extends Component{
    //state for username
    state = { name: ''};
    onChangeText = name => this.setState({name});
    onPress = () => {
        //navigate to chat with username from state

        this.props.navigation.navigate('Chat', { name: this.state.name });
    };


    render() {
        return <View>
            <AppContainer />

            <Text style={styles.title} >
                Enter name:
            </Text>

            <TextInput
                onChangeText={this.onChangeText}
                style={styles.nameInput}
                placeHolder="kakka"
                value={this.state.name}


            />
            <TouchableOpacity onPress={this.onPress} >
                <Text style={styles.button} >Enter</Text>
            </TouchableOpacity>

        </View>
    }

}

const styles = StyleSheet.create({
    nameInput: {
        height: 2,
        margin: 2,
        borderColor: '#000',

    },
    title:{
        marginTop: 1,
        marginLeft: 1,
        fontSize: 1,
    },
    button: {
        marginLeft: 1,
        fontSize: 1,
    }

});

export default Main;