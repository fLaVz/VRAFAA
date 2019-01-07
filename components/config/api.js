import axios from 'axios';
import { AsyncStorage } from 'react-native';

const baseUri = 'http://192.168.1.99:4000';

const login = async (data) => {
    return axios.post(baseUri + '/login', data)
}

const createAccount = async (data) => {
    return axios.post(baseUri + '/register', data)
}

const createArtisan = async (data, headers) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            console.log(token);
            return axios.post(baseUri + '/artisans?token=' + token, data, {headers});
        }
    } catch (error) {
            console.log(error);
    }
}

const getArtisans = async (region) => {
    console.log(region);
    return axios.get(baseUri + '/artisans?region=' + region)
}

const vote = async (data, id, tk) => {
    obj = {
        artisan: data,
        uniqueId: id,
        token: tk,
    }
    return axios.post(baseUri + '/artisans/vote', obj);
}

export {
    login,
    createAccount,
    createArtisan,
    getArtisans,
    vote
}