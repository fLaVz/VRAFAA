import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import LoginScreen from './components/LoginScreen';
import WallScreen from './components/WallScreen';
import CreateAccountScreen from './components/CreateAccount';
import BottomNavigator from './components/BottomNavigator';
import { logout } from './components/config/api';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                headerLeft: null,  // disabled for tests
                headerRight:    <TouchableOpacity
                                    title={'Logout'}
                                    style={styles.logout}
                                    onPress={() => this._logout(navigation)}
                                    underlayColor='#fff'
                                >
                                    <Ionicons name='ios-log-out' size={25} color='#fff'/>
                                </TouchableOpacity>
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

_logout = async (navigation) => {
    const {navigate} = navigation;
    await AsyncStorage.clear();
    navigate('Login');
}


const AppContainer = createAppContainer(RootStack);
// Returns default entry point view which is Login
export default class App extends React.Component {
    render() {
        // For default values purposes only
        console.disableYellowBox = true;
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
    logout: {
        marginRight: 20,
    }
});