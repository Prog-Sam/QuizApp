import cache from '../utility/longCache';

const key = 'localQuizSession'

export const getLocalQuizSession = async (userId) => {
    const {data, ok} = await cache.get(key+userId.toString());
    if(!ok) return null;
    return data;
}

export const storeLocalQuizSession = async (localQuizSession) => {
    const {data, ok} = await cache.store(key+localQuizSession.userId.toString(), localQuizSession);
    if(!ok) return null;
    return data;
}

export const removeLocalQuizSession = async (userId) => {
    const {data} = await cache.remove(key+userId.toString());
    return data;
}

export const proceedQuizState = async (userId) => {
    let localQuizSession = await getLocalQuizSession(userId);
    return await storeLocalQuizSession({...localQuizSession, ['state']: localQuizSession.state +1});
}

export default {
    getLocalQuizSession, storeLocalQuizSession, removeLocalQuizSession, proceedQuizState
}