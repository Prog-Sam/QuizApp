import _ from 'lodash';

const fakeDb = [
    {
        id: 1,
        preQuizId: 1,
        email: 'Some Video URL',
        postQuizId: 2
    },{
        id: 2,
        preQuizId: 3,
        email: 'Some Video URL',
        postQuizId: 4
    },
]

export function getQuizBundless(){
    return fakeDb;
}

export function getQuizBundles(id){
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