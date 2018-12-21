import React from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { getArtisans } from './config/api';

export default class WallScreen extends React.Component {

    constructor(props) {
        super(props)

        // Sample, data comes from API request
        this.state = {
            artisan: [
                {
                    id: '012345',
                    name: 'OOPs, il semble qu\'aucun artisan ne soit présent dans votre région!',
                    region: ''
                }
            ],
            refreshing: false
        }
    }

    componentWillMount() {
        this._getArtisans();
    }

    _getArtisans = async () => {

        await getArtisans()
        .then(response => { 
            artisan = response.data;    
            this.setState({artisan});
            console.log(this.state);
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