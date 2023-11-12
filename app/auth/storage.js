import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode';

const key = 'authToken'
const key2 = 'authUser'

const storeToken = async authToken => {
    try {
    await SecureStore.setItemAsync(key, authToken);
    } catch (error) {
        console.log('Error storing auth token.')
    }
}

const storeUser = async user => {
    try {
        await SecureStore.setItemAsync(key2, JSON.stringify(user))
    } catch (error) {
        console.log('Error storing user auth');
    }
}

const getToken = async () => {
    try {
    return await SecureStore.getItemAsync(key);
        
    } catch (error) {
        console.log('Error getting the auth token');
    }
}

// const getUser = async () => {
//     const token = await getToken();
//     return (token) ? jwtDecode(token) : null;
// }

const getUser = async () => {
    const user = JSON.parse(await SecureStore.getItemAsync(key2));
    return (user) ? user : null;
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log('Cannot Delete auth token');
    }
}

const removeUser = async () => {
    try {
        await SecureStore.deleteItemAsync(key2);
    } catch (error) {
        console.log('Cannot Delete auth user');
    }
}

export default {
    getToken, getUser, removeToken, removeUser, storeToken, storeUser
}