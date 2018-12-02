import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';

export default class WallScreen extends React.Component {
  
  render() {
    return (
        <View style={styles.container}>
            <Text>IO!</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },  
});