import React, {Component} from 'react';

import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
} from  'react-native';

class Main extends Component{
    state = { name: ''};
    onChangeText = name => this.setState({name});
    onPress = () => {
        this.props.navigation.navigate('Chat', { name: this.state.name });
    }


    render() {
        return <View>

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
        marginTop: offset,
        marginLeft: offset,
        fontSize: offset,
    },
    button: {
        marginLeft: offset,
        fontSize: offset,
    }

});

export default Main;