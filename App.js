import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './components/LoginScreen';
import WallScreen from './components/WallScreen';
import CreateAccountScreen from './components/CreateAccount';
import BottomNavigator from './components/BottomNavigator'

// Creates navigation
const RootStack = createStackNavigator(
    {
        Login: LoginScreen,
        Create: {
            screen: CreateAccountScreen,
            navigationOptions: {
                headerTitle: 'Créer un compte',
                headerBackTitle: 'Login',
            }
        },
        Bottom: {   
            screen: BottomNavigator,
            navigationOptions: ({navigation}) => ({
                title: 'Artisans',
                headerLeft: null  // disabled for tests
            })
        },
    },
    { 
        initialRouteName: 'Login',
        mode: 'modal',
        
        defaultNavigationOptions: {
            headerMode: 'screen',
            headerTransitionPreset: 'fade-in-place',
            headerBackTitle: 'Login',
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
        // For default values purposes only
        console.disableYellowBox = true;

        return <AppContainer />;
    }
}