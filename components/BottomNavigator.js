import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import WallScreen from './WallScreen';
import AddScreen from './AddScreen';

const SettingsTabs = createBottomTabNavigator({
    Wall: {
        screen: WallScreen,
        add: AddScreen,
    },
},
{
    title: 'IFEBFGHFOHZAF',
    tabBarOptions: {
        activeTintColor: '#0787f7',
        labelStyle: {
            fontSize: 14,
        },
        style: {
            backgroundColor: '#2a3d5b',
        },
    }
}   
);

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ SettingsTabs }, { headerMode: 'none' });