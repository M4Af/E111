const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');

async function getAllPasswords(filterTitle, filterMail, sort) {
    let filter = {};
    if (filterTitle) {
        filter = { title: { $regex: filterTitle, $options: 'i' } };
    }
    else if (filterMail) {
        filter = { mail: { $regex: filterMail, $options: 'i' } };
    }

    let sortOption = {};
    switch(sort) {
        case 'dataOld': 
            sortOption = { createdAt: 1 }; 
            break;
        case 'dataNew': 
            sortOption = { createdAt: -1 }; 
            break;
        case 'increaseLetter': 
            sortOption = { title: 1 }; 
            break;
        case 'decreaseLetter': 
            sortOption = { title: -1 }; 
        break;
        default: 
            sortOption = { createdAt: -1 };
    }

    return getDB().collection('passwords').find(filter).sort(sortOption).toArray();
}

async function getPasswordById(id) {
    return getDB().collection('passwords').findOne({ _id: new ObjectId(id) });
}

async function addPassword(title, mail, passwordHash) {
    return getDB().collection('passwords').insertOne({ title, mail, passwordHash, createdAt: new Date() });
}

async function updatePassword(id, title, mail, passwordHash) {
    const updateFields = { title, mail };
    
    if (passwordHash) {
        updateFields.passwordHash = passwordHash;
    }

    return getDB().collection('passwords').updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
}

async function deletePassword(id) {
    return getDB().collection('passwords').deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
    getAllPasswords,
    getPasswordById,
    addPassword,
    updatePassword,
    deletePassword
};
