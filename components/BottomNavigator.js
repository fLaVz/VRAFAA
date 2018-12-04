import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import WallScreen from './WallScreen';

const SettingsTabs = createBottomTabNavigator({
    Wall: {
        screen: WallScreen,
        navigationOptions: {
            title: "padjodazdf",
        }
    },
});

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ SettingsTabs }, { headerMode: "none" });