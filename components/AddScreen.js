import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import { ImagePicker, Location, Permissions } from 'expo';

export default class AddScreen extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            name: '',
            file: '',
            video: null,
            maxLength: 120000,
            location: null
        }
    }
    static navigationOptions = {
        title: 'Ajouter',
    };
    _pickImage = async () => {
        Keyboard.dismiss()
        let permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (permission.status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                mediaTypes: 'Videos'
            });              
            console.log(result);
            console.log('Artisan: ' + this.state.name)
            if(result.duration < this.state.maxLength && !result.cancelled) {
                this.setState({ image: result });
            }
            else {
                Alert.alert('Erreur', 'Veuillez selectionner une vidéo de 2 minutes maximum');
            }
        }
    };

    _getLocationAsync = async () => {
        const {navigate} = this.props.navigation;
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        this.setState({ location });
        navigate('Wall');
      };
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                        placeholder={'Nom de l\'artisan'}
                        style={styles.input}
                    />
                    <TouchableOpacity
                        title={'Video'}
                        style={styles.videoButton}
                        onPress={this._pickImage}
                        underlayColor='#fff'
                    >
                    <Text style={styles.artisanText}>Choisir Vidéo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    title={'Add'}
                        style={styles.artisanButton}
                        onPress={this._getLocationAsync}
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
    videoButton: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 60,
        padding: 10,
        width: 200,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: '#1456a8',
        borderColor: '#1e2937',
        color: 'white'
    }
});