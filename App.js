import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './components/LoginScreen'
import WallScreen from './components/WallScreen'

// Creates navigation
const RootStack = createStackNavigator(
    {
        Login: LoginScreen,
        Wall: WallScreen,
    },
    {
        initialRouteName: 'Login',
    }
);


const AppContainer = createAppContainer(RootStack);

// Returns default entry point view which is Login
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}