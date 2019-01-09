import axios from 'axios';
import { AsyncStorage } from 'react-native';

const baseUri = 'http://172.20.10.10:4000';

const login = async (email, password) => {
    data = {
        email: email,
        password: password
    }
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
    return axios.get(baseUri + '/artisans?region=' + region)
}

const vote = async (data, id) => {
    obj = {
        artisan: data,
        uniqueId: id,
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