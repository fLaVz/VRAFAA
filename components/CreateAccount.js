import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Create Account',
        mode: 'modal',
        headerMode: 'float',
        headerTransitionPreset: 'fade-in-place',
        animationType: 'none',
        headerStyle: {
            backgroundColor: '#1e2937',
            shadowColor: 'transparent', // Both below attributes removes ugly white buged default border
            borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
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
        Alert.alert('Credentials', `${email} : ${password}`);
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
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
                        onPress={() => navigate('Wall')/*this.onLogin.bind(this)*/}
                        underlayColor='#fff'
                    >
                    <Text style={styles.loginText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
