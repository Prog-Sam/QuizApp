import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';

const prefix = 'cache';
const expiryInMinutes = 5;

const isExpired = item => {
    const now = moment(Date.now());
    const storedTime = moment(item.timestamp);
    return now.diff(storedTime, 'minutes') > expiryInMinutes;
}

const store = async (key, value) => {
    try {
        const item = {
            value,
            timestamp: Date.now()
        }
        await AsyncStorage.setItem(prefix+key, JSON.stringify(item));
    } catch (ex) {
        console.log(ex);
    }
}

const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(prefix+key);
        const item = JSON.parse(value);

        if(!item) return null;

        if (isExpired(item)) {
            await AsyncStorage.removeItem(prefix+key);
            return null;
        }

        return item.value;
    } catch (ex) {
        console.log(ex);
    }
}

const remove = async (key) => {
    try {
        await AsyncStorage.removeItem(prefix+key);
        return {status: 200, message: 'Item Removed from storage.'}
    } catch (ex) {
        console.log(ex);
    }
}

export default {
    store,
    get,
    remove
}