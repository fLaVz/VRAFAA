import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, AsyncStorage } from 'react-native';
import { createAccount } from './config/api';
import { Permissions, Location, Constants } from 'expo';
import axios from 'axios';

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
    
    onCreate = async () => {
        Keyboard.dismiss();
        const {navigate} = this.props.navigation;
        createAccount(this.state)
        .then(response => { 
            console.log(response.data.token)
            if(response.data.token) {
                try {
                    data = {
                        key: 'token',
                        value: response.data.token
                    };
                    AsyncStorage.setItem(data.key, data.value);
                }catch(e) {
                    console.log(e);
                }
                this._getRegion()
                .then(location => {
                    this._setUniqueId();
                    navigate('Wall', {
                        region: location,
                    });
                })
                .catch(error => this.setState({ errorMessage: error }));
            }else {
                Alert.alert('Oops', 'Ce compte existe déjà!')
            }
        });
    }

    _setUniqueId = async () => {
        dataId = {
            key: 'id',
            value: Constants.deviceId
        };
        await AsyncStorage.setItem(dataId.key, dataId.value)
    }

    _getRegion = () => {
        return new Promise((resolve, reject) => {
            let { status } = Permissions.askAsync(Permissions.LOCATION).then(({ status }) => {
                if (status !== 'granted') {
                    reject('Permission to access location was denied');
                }else {
                    Location.getCurrentPositionAsync({}).then(location => {
                        axios.get(
                            'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + location.coords.latitude + 
                            '&lon=' + location.coords.longitude + 
                            '&zoom=5'
                        )
                        .then(response => { 
                            if(response.data.address.state) {
                                console.log(response.data.address.state);
                                resolve(response.data.address.state);
                            }
                        })
                    });
                }
            });
        });
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
