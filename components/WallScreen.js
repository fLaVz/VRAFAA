import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class WallScreen extends React.Component {

    constructor(props) {
        super(props)
        
        // Sample, data comes from API request
        this.state = {
            "users": 
            [
                {
                    "name": "Proxima Midnight",
                    "email": "proxima@appdividend.com"
                },
                {
                    "name": "Ebony Maw",
                    "email": "ebony@appdividend.com"
                },
                {
                    "name": "Black Dwarf",
                    "email": "dwarf@appdividend.com"
                },
            ]
        }
    }
    static navigationOptions = {
        title: 'Artisans',
        mode: 'modal',
        headerMode: 'float',
        headerTransitionPreset: 'fade-in-place',
        headerLeft: null,
        headerStyle: {
            backgroundColor: '#1e2937',
            shadowColor: 'transparent', // Both below attributes removes ugly white buged default border
            borderBottomWidth: 0,
        },
        headerTintColor: '#2a3d5b',
        tabBarOptions: {
            activeTintColor: '#0787f7',
            labelStyle: {
              fontSize: 12,
            },
            style: {
              backgroundColor: '#2a3d5b',
            },
          }
    };
    render() {
        return (
                <FlatList style={styles.container}
                    data={this.state.users}
                    renderItem={({item}) =>
                    <View style={styles.list}> 
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.email}</Text>
                    </View>
                    }
                    keyExtractor={item => item.email}
                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#171f2a'
    },
    list: {
        fontWeight: 'bold',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#3a444c',
        padding: 20
    },
    text: {
        color: 'white'
    }

});