import _ from 'lodash';

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

export function getTests(){
    return fakeDb;
}

export function getTest(id){
    return _.find(fakeDb, item => item.id == id);
}

export function saveTest(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localTest = {...item, id: newId}
    fakeDb.push(localTest)
    return(fakeDb);
}

export function deleteTest(id){
    return fakeDb.filter(item => item.id != id)
}