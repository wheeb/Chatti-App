import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from "./components/Main";
import Chat from "./components/Chat";

import { createStackNavigator } from 'react-navigation';

const navigator = createStackNavigator({
  Main: { screen: Main},
  Chat: {screen: Chat },
});

export default navigator



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
