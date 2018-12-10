import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class WallScreen extends React.Component {

    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        title: 'Ajouter',
    };
    render() {
        return (
            <View style={styles.form}>
            <StatusBar
                barStyle='dark-content'
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
            title={'Add'}
                style={styles.artisanButton}
                onPress={() => navigate('Bottom')/*this.onLogin.bind(this)*/}
                underlayColor='#fff'
            >
            <Text style={styles.artisanText}>Ajouter un Artisan</Text>
            </TouchableOpacity>
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
    artisanButton: {
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
    artisanText: {
        color: '#fff'
    },
});