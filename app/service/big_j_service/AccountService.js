import _ from 'lodash';

const fakeDb = [
    {
        ta_id: 1,
        ta_username: 'admin',
        ta_password: '1234',
        ta_dateCreated: Date.now(),
        ta_status: true,
        tr_id: 1
    },{
        ta_id: 2,
        ta_username: 'user',
        ta_password: '1234',
        ta_dateCreated: Date.now(),
        ta_status: true,
        tr_id: 1
    },{
        ta_id: 3,
        ta_username: 'teacher',
        ta_password: '1234',
        ta_dateCreated: Date.now(),
        ta_status: false,
        tr_id: 1
    },{
        ta_id: 4,
        ta_username: 'Esmael',
        ta_password: '1234',
        ta_dateCreated: Date.now(),
        ta_status: false,
        tr_id: 1
    },{
        ta_id: 5,
        ta_username: 'teacher1',
        ta_password: '1234',
        ta_dateCreated: Date.now(),
        ta_status: true,
        tr_id: 2
    }
]

export function getAccounts(){
    return fakeDb;
}

export function getAccount(ta_id){
    return _.find(fakeDb, item => item.ta_id == ta_id);
}

export function saveAccount(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localAccount = {...item, ta_id: newId}
    fakeDb.push(localAccount)
    return(fakeDb);
}

export function deleteAccount(ta_id){
    return fakeDb.filter(item => item.ta_id != ta_id)
}