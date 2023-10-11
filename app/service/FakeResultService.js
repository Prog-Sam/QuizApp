import _ from 'lodash';

const fakeDb = [
    {
        id: 1,
        quizSessionId: 1,
        userId: 3,
        score: 2
    },
]

export function getResults(){
    return fakeDb;
}

export function getResult(id){
    return _.find(fakeDb, item => item.id == id);
}

export function saveResult(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localResult = {...item, id: newId}
    fakeDb.push(localResult)
    return(fakeDb);
}

export function deleteResult(id){
    return fakeDb.filter(item => item.id != id)
}