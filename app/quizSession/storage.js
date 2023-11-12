import cache from '../utility/longCache';

const key = 'localQuizSession'

export const getLocalQuizSession = async (ta_id) => {
    const {data, ok} = await cache.get(key+ta_id.toString());
    if(!ok) return null;
    return data;
}

export const storeLocalQuizSession = async (localQuizSession) => {
    const {data, ok} = await cache.store(key+localQuizSession.ta_id.toString(), localQuizSession);
    if(!ok) return null;
    return data;
}

export const removeLocalQuizSession = async (ta_id) => {
    const {data} = await cache.remove(key+ta_id.toString());
    return data;
}

export const proceedQuizState = async (ta_id) => {
    let localQuizSession = await getLocalQuizSession(ta_id);
    return await storeLocalQuizSession({...localQuizSession, ['state']: localQuizSession.state +1});
}

export default {
    getLocalQuizSession, storeLocalQuizSession, removeLocalQuizSession, proceedQuizState
}