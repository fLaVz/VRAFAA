import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WallScreen from './WallScreen';
import AddScreen from './AddScreen';

const SettingsTabs = createBottomTabNavigator({
    Wall: {
        screen: WallScreen,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-aperture' size={30} color={tintColor}/>
        }
    },
    Add: {
        screen: AddScreen,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-person-add' size={30} color={tintColor}/>
        }
    }
},
{
    tabBarOptions: {
        activeTintColor: '#0787f7',
        showLabel: false,
        labelStyle: {
            fontSize: 14,
        },
        style: {
            backgroundColor: '#1e2937',
        },
    }
}   
);

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ SettingsTabs }, { headerMode: 'none' });