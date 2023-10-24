import _ from 'lodash';

const fakeDb = [
    {
        id: 1,
        userId: 3,
        quizBundleId: 1,
        iat: Date.now()
    },
]

export function getQuizSessions({userId, quizBundleId, includeUser, includeQuizBundle}){
    let localQuizSession = [...fakeDb];

    if(quizBundleId)
        localItem = localItem.filter((item) => item.quizBundleId == quizBundleId)
    if(userId)
        localItem = localItem.filter((item) => item.userId == userId)

    return localQuizSession;
}

export function getQuizSession(id){
    return _.find(fakeDb, item => item.id == id);
}

export function saveQuizSession(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localQuizSession = {...item, id: newId}
    fakeDb.push(localQuizSession)
    return(fakeDb);
}

export function deleteQuizSession(id){
    return fakeDb.filter(item => item.id != id)
}