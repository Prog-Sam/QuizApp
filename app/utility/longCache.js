import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';

const prefix = 'longCache';

const store = async (key, value) => {
    try {
        const item = {
            value,
            timestamp: Date.now()
        }
        await AsyncStorage.setItem(prefix+key, JSON.stringify(item));
        return {data: value, ok: true}
    } catch (ex) {
        console.log(ex);
        return {data: ex, ok: false }
    }
}

const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(prefix+key);
        const item = JSON.parse(value);

        if(!item) return null;

        return {data: item.value, ok: true}
    } catch (ex) {
        console.log(ex);
        return {data: ex, ok: false};
    }
}

const remove = async (key) => {
    try {
        await AsyncStorage.removeItem(prefix+key);
        return {ok: true, data: 'Item Removed from storage.'}
    } catch (ex) {
        console.log(ex);
        return {ok: false, data: 'Item not removed'}
    }
}

export default {
    store,
    get,
    remove
}