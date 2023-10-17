import _ from 'lodash';
import { getQuiz } from './FakeQuizService';

const fakeDb = [
    {
        id: 1,
        title: 'Test 1',
        preQuizId: 1,
        url: 'Some Video URL',
        postQuizId: 2
    },{
        id: 2,
        title: 'Test 2',
        preQuizId: 3,
        url: 'Some Video URL',
        postQuizId: 4
    },
]

export function getQuizBundles({includeQuizes=false}){
    let localQuizBundles = [...fakeDb]
    if(includeQuizes) return localQuizBundles.map((item) => ({...item, PreQuiz: getQuiz(item.preQuizId), PostQuiz: getQuiz(item.postQuizId)}))
    return fakeDb;
}

export function getQuizBundle(id){
    return _.find(fakeDb, item => item.id == id);
}

export function saveQuizBundles(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localQuizBundles = {...item, id: newId}
    fakeDb.push(localQuizBundles)
    return(fakeDb);
}

export function deleteQuizBundles(id){
    return fakeDb.filter(item => item.id != id)
}