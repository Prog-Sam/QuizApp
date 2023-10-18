import _ from 'lodash';
import { getUser } from './FakeUserService';
import { getQuizSession } from './FakeQuizSession';
import { getItem } from './FakeItemService';

const fakeDb = [
    {
        id: 1,
        quizSessionId:1,
        userId: 3,
        itemId: 1,
        currentAnswer: 0
    },{
        id: 2,
        quizSessionId:1,
        userId: 3,
        itemId: 2,
        currentAnswer: 1
    },{
        id: 3,
        quizSessionId:1,
        userId: 3,
        itemId: 3,
        currentAnswer: 3
    }
]

export function getUserAnswers({quizSessionId, userId, itemId, includeUser, includeQuizSession, includeItem}){
    let localItems = [...fakeDb];
    if(quizSessionId)
        localItems = localItems.filter((item) => quizSessionId == item.quizSessionId);
    if(userId)
        localItems = localItems.filter((item) => userId == item.userId);
    if(itemId)
        localItems = localItems.filter((item) => itemId == item.itemId);
    if(includeUser)
        localItems = localItems.map((item) => ({...item, User: getUser(item.userId)}))
    if(includeQuizSession)
        localItems = localItems.map((item) => ({...item, QuizSession: getQuizSession(item.quizSessionId)}))
    if(includeItem)
        localItems = localItems.map((item) => ({...item, Item: getItem(item.itemId)}))

    return localItems;
}

export function getUserAnswer(id){
    return _.find(fakeDb, item => item.id == id);
}

export function saveUserAnswer(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localUserAnswer = {...item, id: newId}
    fakeDb.push(localUserAnswer)
    return(fakeDb);
}

export function deleteUserAnswer(id){
    return fakeDb.filter(item => item.id != id)
}