import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import LoginScreen from './components/LoginScreen';
import WallScreen from './components/WallScreen';
import CreateAccountScreen from './components/CreateAccount';
import BottomNavigator from './components/BottomNavigator'

// Creates navigation
const RootStack = createStackNavigator(
    {
        Login: LoginScreen,
        CreateAccount: {
            screen: CreateAccountScreen,
            navigationOptions: {
                title: 'CreateAccount',
            }
        },
        Bottom: BottomNavigator,
        Wall: {
            screen: WallScreen,
            navigationOptions: {
                title: 'test',
                headerLeft: null
            }
        }
    },
    {
        defaultNavigationOptions: {
            initialRouteName: 'Login',
            mode: 'modal',
            headerMode: 'screen',
            headerTransitionPreset: 'fade-in-place',
            // headerLeft: null,
            headerStyle: {
                backgroundColor: '#1e2937',
                shadowColor: '#fff', // Both below attributes removes ugly white buged default border
                borderBottomWidth: 0,
            },
            headerTintColor: '#fff',
        }
    },
);

const AppContainer = createAppContainer(RootStack);

// Returns default entry point view which is Login
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}