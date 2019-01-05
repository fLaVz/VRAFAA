import React from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity, AsyncStorage } from 'react-native';
import { getArtisans, vote } from './config/api';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class WallScreen extends React.Component {

    static navigationOptions = {
        headerBackTitle: 'test'
    }
    constructor(props) {
        super(props)

        this._onLike = this._onLike.bind(this),

        this.state = {
            refreshing: false,
            iconColor: {},
        }
    }

    componentWillMount = async () => {
        await this._getArtisans();
        this._updateLikes();
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
        await getArtisans()
        .then(response => { 
            artisan = response.data;    
            this.setState({artisan})
        });
        console.log(this.state.artisan);
    }

    _onRefresh = async () => {
        this.setState({refreshing: true});
        getArtisans()
        .then((response) => {
            artisan = response.data;
            this.setState({artisan});
        }, (error) => {
            console.log(error);
        });
        this.setState({refreshing: false});
    }

    _onLike = async (idItem) => {
        if(this.state.iconColor[idItem] == '#ff0059') {
            this.state.iconColor[idItem] = '#fff'
        }else {
            this.state.iconColor[idItem] = '#ff0059'
            await this._retrieveData('token');
            await this._retrieveData('id');
            vote(idItem, this.state.deviceId, this.state.uniqueId)
            .then((response) => {
                console.log(response.data)
            }, (error) => {
                console.log(error)
            })
        }
        this._onRefresh();
    }

    _retrieveData = async (key) => {
        try {
            const data = await AsyncStorage.getItem(key);
            if(key == 'token' & data !== null) {
                this.setState({token: data})
                console.log(this.state.token)
            }else if(key == 'id' & data !== null) {
                this.setState({deviceId: data})
                console.log(this.state.deviceId)
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
    }
});