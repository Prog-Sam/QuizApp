import _ from 'lodash';

const fakeDb = [
    {
        id: 1,
        name: 'Sam',
        email: 'firesam@gmail.com',
        password: '1234'
    },{
        id: 2,
        name: 'Joshua',
        email: 'jBaqs@gmail.com',
        password: '1234'
    },{
        id: 3,
        name: 'Fritzy',
        email: 'gokiritsu@gmail.com',
        password: '1234'
    }
]

export function getUsers(){
    return fakeDb;
}

export function getUser(id){
    return _.find(fakeDb, item => item.id == id);
}

export function saveUser(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localUser = {...item, id: newId}
    fakeDb.push(localUser)
    return(fakeDb);
}

export function deleteUser(id){
    return fakeDb.filter(item => item.id != id)
}