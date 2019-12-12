import React, {Component} from 'react';

import {View, TextInput, StyleSheet, Text, TouchableOpacity} from  'react-native';
//const {navigate} = props.navigation;

class Main extends Component{
    static navigationOptions = {
        title: 'Chatter',
    };

    state = {
        name: '',
    };
    onChangeText = name => this.setState({name});
    onPress = () => {

        this.props.navigation.navigate('Chat', { name: this.state.name });
    };



    render() {
        return (
        <View>

            <Text style={styles.title} >
                Enter name:
            </Text>

            <TextInput
                onChangeText={this.onChangeText}
                style={styles.nameInput}
                placeHolder="Your name"
                value={this.state.name}


            />

                <TouchableOpacity onPress={this.onPress} style={styles.touchableButton} >
                    <Text style={styles.button} >Enter</Text>
                </TouchableOpacity>

        </View>
        )
    }

}

const styles = StyleSheet.create({
    nameInput: {
        height: 20,
        margin: 2,
        borderColor: '#000',
        borderWidth: 1,

    },
    title:{
        marginTop: 24,
        marginLeft: 24,
        fontSize: 24,
    },
    button: {
        marginLeft: 1,
        fontSize: 15,
    },
    touchableButton: {
        padding:10,
        marginTop: 10,
        marginBottom:10,
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#000',
        borderRadius: 3,
        alignItems: "center",
        backgroundColor: '#0FC7FF',


    }

});

export default Main;