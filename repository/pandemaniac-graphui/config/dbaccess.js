/**
 * Module for using the mongo database
 */

const { MongoClient } = require('mongodb');
const mongoURI = 'mongodb://localhost';

let _db;

module.exports = {
    connectToDB: async function () {
        const mongoClient = new MongoClient(mongoURI);
        try {
            await mongoClient.connect();
            let db_name;
            if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
                db_name = 'pandemaniac';
            } else {
                db_name = 'pandemaniac_test';
            }
            _db = mongoClient.db(db_name);
        } catch (e) {
            console.error(e);
        }
    },
    getDB: function() {
        return _db;
    }
}