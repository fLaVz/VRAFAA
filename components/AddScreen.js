import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Picker} from 'react-native';

export default class WallScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            file: '',
        }
    }
    static navigationOptions = {
        title: 'Ajouter',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                        placeholder={'Nom de l\'artisan'}
                        style={styles.input}
                    />
                    <TouchableOpacity
                    title={'Add'}
                        style={styles.artisanButton}
                        onPress={() => navigate('Wall')}
                        underlayColor='#fff'
                    >
                    <Text style={styles.artisanText}>Ajouter un Artisan</Text>
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