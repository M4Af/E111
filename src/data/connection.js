const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

async function connectDB() {
    try{
        await client.connect();
        db = client.db('passwords');
        console.log('Połączono z MongoDB');
    }catch(err){
        console.error('Błąd połączenia z MongoDB:', err)
    }
}

function getDB() {
    if (!db) throw new Error('Baza danych nie jest połączona!');
    return db;
}

module.exports = { connectDB, getDB };
