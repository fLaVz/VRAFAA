import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput, ImageBackground, StatusBar, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { login } from './config/api';
import { Constants, Location, Permissions } from 'expo';
import axios from 'axios';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            region: 'test'
        };
    }
    onLogin = async () => {
        Keyboard.dismiss();
        const {navigate} = this.props.navigation;
        login(this.state.email, this.state.password)
            .then(response => { 
                console.log(response.data)
                if(response.data.token) {
                    this._getRegion()
                    .then(location => {
                        this._setUniqueId();
                        this._storeData({key: 'token', value: response.data.token});
                        console.log('HALO: ' + location)
                        navigate('Wall', {
                            region: location,
                        });
                    })
                    .catch(error => this.setState({ errorMessage: error }));
                }
        }, (error) => {
            Alert.alert('Oops', 'Combinaison Login/Mot de passe invalide');
        });
        
    }

    _onVisitor = async () => {
        const {navigate} = this.props.navigation;
        this._getRegion()
        .then(location => {
            this._setUniqueId();
            console.log('HALO: ' + location)
            navigate('Wall', {
                region: location,
            });
        })
        .catch(error => this.setState({ errorMessage: error }));
    }

    _setUniqueId = async () => {
        dataId = {
            key: 'id',
            value: Constants.deviceId
        };
        this._storeData(dataId);
    }

    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem(data.key, data.value);
        } catch (error) {
            console.log(error);
        }
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
                <ImageBackground source={require('../assets/bgVra.png')} style={ styles.container }>
                    <View style={styles.form}>
                        <StatusBar
                            barStyle='light-content'
                        />
                        <TextInput
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            keyboardType={'email-address'}
                            placeholder={'Email'}
                            style={styles.input}
                        />
                        <TextInput
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                            placeholder={'Mot de passe'}
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
                        <Text style={styles.createText}>Ou</Text>
                        <TouchableOpacity
                            title={'Go'}
                            style={styles.create}
                            onPress={this._onVisitor.bind(this)}
                            underlayColor='#fff'
                        >
                        <Text style={styles.createText}>Consultez la liste des artisans</Text>
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
        marginTop: 0,
    },
    createText: {
        marginTop: 20,
        color: '#fff'
    }
});
