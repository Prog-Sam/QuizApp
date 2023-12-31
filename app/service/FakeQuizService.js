import _ from 'lodash';

const fakeDb = [
    {
        id: 1,
        title: 'title1',
        difficulty: '1'
    },
    {
        id: 2,
        title: 'title2',
        difficulty: '1'
    },
    {
        id: 3,
        title: 'title3',
        difficulty: '2'
    },
    {
        id: 4,
        title: 'title4',
        difficulty: '3'
    }
]

export function getQuizes(){
    return fakeDb;
}

export function getQuiz(id){
    return _.find(fakeDb, item => item.id == id);
}

export function saveQuiz(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localQuiz = {...item, id: newId}
    fakeDb.push(localQuiz)
    return(fakeDb);
}

export function deleteQuiz(id){
    return fakeDb.filter(item => item.id != id)
}