import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { createAccount } from './config/api';

export default class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: 'TEST',
            lastName: 'test', 
            email: 'test@test.fr',
            password: 'test',
        };
    }
    
    onCreate() {
        const {navigate} = this.props.navigation;
        createAccount(this.state)
        .then(response => { 
            console.log(response.data)
            if(response.data.token) {
                Alert.alert('Compte Créé' ,'Veuillez vous identifier');
                navigate('Login');
            }
        });
        Keyboard.dismiss();
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <StatusBar
                            barStyle='light-content'
                        />
                        <TextInput
                            value={this.state.firstName}
                            onChangeText={(firstName) => this.setState({ firstName })}
                            placeholder={'fName'}
                            style={styles.input}
                        />
                        <TextInput
                            value={this.state.lastName}
                            onChangeText={(lastName) => this.setState({ lastName })}
                            placeholder={'lName'}
                            style={styles.input}
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
                            onPress={this.onCreate.bind(this)}
                            underlayColor='#fff'
                        >
                        <Text style={styles.loginText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        backgroundColor: '#171f2a'
    },
    form: {
        marginTop: -200,
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
        marginTop: 80,
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
