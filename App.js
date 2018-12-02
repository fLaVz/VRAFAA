import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    const { username, password } = this.state;
    Alert.alert('Credentials', `${username} : ${password}`);
  }

  render() {
    return (
      <ImageBackground source={require('./assets/bg.png')} style={ styles.container }>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="white"
            barStyle="light-content"
          />
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />
          
          <TouchableOpacity
            title={'Login'}
            style={styles.loginScreenButton}
            onPress={this.onLogin.bind(this)}
            underlayColor='#fff'
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity> 
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  loginScreenButton: {
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    width: 200,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#027cff',
    borderColor: '#027cff',
    color: 'white'
  },
  loginText: {
    color: '#fff'
  }
});