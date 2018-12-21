import React from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { getArtisans } from './config/api';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class WallScreen extends React.Component {

    static navigationOptions = {
        headerBackTitle: 'test'
    }
    constructor(props) {
        super(props)

        this._onLike = this._onLike.bind(this),
        // Sample, data comes from API request
        this.state = {
            refreshing: false,
            iconColor: {'empty':'ept'},
        }
    }

    componentWillMount = async () => {
        await this._getArtisans();
        this.state.artisan.forEach((item) => {
            console.log('id: ' + item._id)
            let obj = {
                id: item._id,
                color: '#fff'
            }
            this.setState({
                iconColor: {
                   ...this.state.iconColor,
                   [item._id]: '#fff'
                }
              });
        })
        console.log(this.state.iconColor);
    }


    _getArtisans = async () => {

        await getArtisans()
        .then(response => { 
            artisan = response.data;    
            this.setState({artisan})
        });
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        getArtisans()
        .then((response) => {
            artisan = response.data;
            this.setState({artisan});
            this.setState({refreshing: false});
        });
    }

    _onLike = (id) => {
        if(this.state.iconColor[id] == '#fff') {
            this.state.iconColor[id] = '#ff0059'
        }else {
            this.state.iconColor[id] = '#fff'
        }
        
        this._onRefresh();
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Text>{ getRegionByLocation }</Text> */}
                <FlatList
                    style={styles.list}
                    data={this.state.artisan}
                    renderItem={({item}) =>
                        <View style={styles.listItem}> 
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.text}>{item.region}</Text>
                            <TouchableOpacity
                            title={'Login'}
                            style={styles.loginButton}
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
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#3a444c',
        padding: 20,
        backgroundColor: '#182330',
    },
    text: {
        color: 'white'
    }

});