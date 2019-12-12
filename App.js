import React, {Component} from 'react';
import Main from "./components/Main";
import Chat from "./components/Chat";
import * as firebase from 'firebase';


import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


const navigator = createStackNavigator({
  Main: { screen: Main},
  Chat: {screen: Chat },
});
const AppContainer = createAppContainer(navigator);


class Router extends Component {
  render(){
    return <AppContainer/>
  }
}
export default Router;



