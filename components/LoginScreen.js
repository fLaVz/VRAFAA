import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Alert, TextInput, ImageBackground, StatusBar, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
 
export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    onLogin() {
       
        const { email, password } = this.state;
        const {navigate} = this.props.navigation;
        // Alert.alert('Credentials', `${email} : ${password}`);
        axios.post('http://localhost:4000/login', this.state)
        .then(response => {
            console.log('RESPONSE: ')
            console.log(response);
            navigate('Bottom');
        })
        .catch(error => {
            console.log(error);
        })
        Keyboard.dismiss();
        
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ImageBackground source={require('../assets/bg.png')} style={ styles.container }>
                    <View style={styles.form}>
                        <StatusBar
                            barStyle='light-content'
                        />
                        <TextInput
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            placeholder={'Email'}
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
                        <TouchableOpacity
                            title={'Login'}
                            style={styles.create}
                            onPress={() => navigate('Create')/*this.onLogin.bind(this)*/}
                            underlayColor='#fff'
                        >
                        <Text style={styles.createText}>Créer un compte</Text>
                        </TouchableOpacity> 
                </View>
            </ImageBackground>
            </TouchableWithoutFeedback>
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
    form: {
        marginTop: -150,
        alignItems: 'center'
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
        marginTop: 8,
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
    },
    create: {
        marginTop: 40,
    },
    createText: {
        color: '#fff'
    }
});
