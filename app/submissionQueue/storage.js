import cache from '../utility/longCache';

const key = 'submissionQueue'

export const getQueue = async () => {
    try {
        const {data, ok} = await cache.get(key);
        if(!ok) return [];
        return data;
    } catch (error) {
        return [];
    }
}

export const storeQueue = async (queue) => {
    const {data, ok} = await cache.store(key, queue);
    if(!ok) return null;
    return data;
}

export const removeQueue = async () => {
    try{
        const {data} = await cache.remove(key);
        return data;
    } catch (ex) {
        return {ok: false, data: null}
    }
}

export default {
    getQueue, storeQueue, removeQueue
}