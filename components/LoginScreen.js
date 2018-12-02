import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
 
export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        headerStyle: {
            backgroundColor: '#212942',
            shadowColor: 'transparent', // Both below attributes removes ugly white buged default border
            borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
    };
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
            <ImageBackground source={require('../assets/bg.png')} style={ styles.container }>
                <View style={styles.container}>
                    <StatusBar
                        barStyle='light-content'
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
                        style={styles.loginButton}
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
        margin: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        textAlign: 'center',
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: 'white',
    },
    loginButton: {
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
