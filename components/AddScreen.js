import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
import { ImagePicker, Location, Permissions } from 'expo';
import axios from 'axios';
import { createArtisan } from './config/api';

export default class AddScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            video: null,
            maxLength: 120000,
            location: null,
            region: null,
            token: null
            
        }
    }

    _pickImage = async () => {

        await this._retrieveData();
        console.log(this.state.token)

        if(this.state.token != null) {
            Keyboard.dismiss();
            let permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (permission.status === 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    mediaTypes: 'Videos',
                    base64: false
                });              
                if(result.duration < this.state.maxLength && !result.cancelled) {
                    this.setState({ video: result });
                }
                else {
                    Alert.alert('Oops!', 'Veuillez selectionner une vidéo de 2 minutes maximum');
                }
            }
            console.log(this.state)
        }else {
            const {navigate} = this.props.navigation;
            Alert.alert(
                'Oops!',
                'Vous devez être connecté pour pouvoir ajouter un artisan',
                [
                  {text: 'Se Connecter', onPress: () => navigate('Login')},
                  {text: 'Créer un compte', onPress: () => navigate('Create')},
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
        } 
    };

    _getLocationAsync = async () => {
        if(this.state.video == null) {
            Alert.alert('Oops!', 'Veuillez poster au moins une vidéo');
            return;
        }
    
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }else {
            let location = await Location.getCurrentPositionAsync({});
            this.setState({ location });
            this._getRegion();
        }
    };

    _getRegion = async () => {
        axios.get(
            'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.state.location.coords.latitude + 
            '&lon=' + this.state.location.coords.longitude + 
            '&zoom=5'
        )
        .then(response => { 
            if(response.data.address.state) {
                this.setState({region: response.data.address.state});
                console.log('LOGSTATE: ' + this.state.region);
                this._createArtisan();
            }
        });
    };

    _retrieveData = async () => {
        try {
            const data = await AsyncStorage.getItem('token');
            if (data !== null) {
                this.setState({token: data})
            }
        } catch (error) {
                console.log(error)
        }
    }

    _createArtisan = async () => {
        const {navigate} = this.props.navigation;
        const formData = new FormData();
        const headers = {'Content-Type': 'multipart/form-data'};

        formData.append('name', this.state.name);
        formData.append('region', this.state.region);
        formData.append('video', {
            uri: this.state.video.uri,
            name: 'artisanvideo.mp4'
        });
        console.log(formData);
        
        try {
            createArtisan(formData, headers)
            .then(response => { 
                console.log(response.data)
                navigate('Wall');
                Alert.alert('Super!', 'Artisan ajouté')
            })
        }catch(e) {
            console.log(e);
        }
        
    };

    render() {
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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