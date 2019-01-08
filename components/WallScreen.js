import React from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { getArtisans, vote } from './config/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Video } from 'expo';

export default class WallScreen extends React.Component {

    constructor(props) {
        super(props)
        this._onLike = this._onLike.bind(this),
        this.state = {
            refreshing: false,
            iconColor: {},
        }
    }

    componentWillMount = async () => {
        console.log('Wall region', this.props.navigation.state.params.region)
        await this.setState({region: this.props.navigation.state.params.region})
        await this._getArtisans();
        await this._updateLikes();
        console.log(this.state.artisan);
    }

    _updateLikes = async () => {
        this.state.artisan.forEach((item) => {
            this.setState({
                iconColor: {
                   ...this.state.iconColor,
                   [item._id]: '#fff'
                }
            });
        })
    }


    _getArtisans = async () => {
        await getArtisans(this.state.region)
        .then(response => { 
            artisan = response.data;    
            this.setState({artisan})
        });
        console.log('getArtisans: ' + this.state.artisan);
    }

    _onRefresh = async () => {
        this.setState({refreshing: true});
        await getArtisans(this.state.region)
        .then((response) => {
            artisan = response.data;
            this.setState({artisan});
        });
        this.setState({refreshing: false});
    }

    _onLike = async (idItem) => {
        await this._retrieveData('id');
        console.log('ITEM: ', idItem);
        console.log('DEVICE: ', this.state.deviceId);
        vote(idItem, this.state.deviceId)
        .then((response) => {
            console.log(response.data)
            this.state.iconColor[idItem] = '#ff0059';
            this._onRefresh();
        }, (reason) => {
            console.log(reason);
            Alert.alert('Oops!', 'Vous ne pouvez voter qu\'une fois par jour');
        })
    }

    _retrieveData = async (key) => {
        try {
            const data = await AsyncStorage.getItem(key);
            if(key == 'token' && data !== null) {
                this.setState({token: data})
                console.log('retrieveData: ' + this.state.token)
            }else if(key == 'id' && data !== null) {
                this.setState({deviceId: data})
                console.log('retrieveData: ' + this.state.deviceId)
            }
        } catch (error) {
                console.log(error)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={this.state.artisan}
                    renderItem={({item}) =>
                        <View style={styles.listItem}>
                            <Text style={styles.textlight}>Crée par: {item.creator.lastName}, le {item.createdAt}</Text>
                            <Text style={styles.artisan}>{item.name}&nbsp;
                                <Text style={styles.textlight}>@{item.region}</Text>
                            </Text>
                            <Video
                                source={{ uri: item.video }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={true}
                                resizeMode="cover"
                                useNativeControls
                                style={styles.video}
                            />
                            <TouchableOpacity
                            title={'Heart'}
                            style={styles.like}
                            onPress={() => this._onLike(item._id)}
                            underlayColor='#fff'
                            >
                                <Ionicons name='ios-heart' size={20} color={this.state.iconColor[item._id]}/>
                            </TouchableOpacity>
                        </View>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            title='Pull to refresh!'
                            titleColor='white'
                        />
                    }
                    keyExtractor={item => item._id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#243447'
    },
    list: {
        backgroundColor: '#141d26'
    },
    listItem: {
        fontWeight: 'bold',
        borderBottomWidth: 0.3,
        borderColor: '#3a444c',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30, 
        backgroundColor: '#182330',
    },
    text: {
        color: 'white'
    },
    textlight: {
        color: '#a8a8a8',
        fontWeight: 'normal'
    },
    artisan: {
        color: 'white',
        fontWeight: 'bold',
    },  
    like: {
        paddingTop: 20,
    },
    video: {
        marginTop: 20,
        width: 300,
        height: 200,
        borderWidth: 1,
        borderColor: '#3a444c',
        borderRadius: 5,
        overflow: 'hidden'
    }
});