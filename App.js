import React from 'react';
import Main from "./components/Main";
import Chat from "./components/Chat";

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


const navigator = createStackNavigator({
  Main: { screen: Main},
  Chat: {screen: Chat },
});
const AppContainer = createAppContainer(navigator);

export default navigator



