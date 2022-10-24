const { MongoClient } = require('mongodb');

const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString);

let _database;

module.exports = {
  connectToServer: () => {
    client.connect();
    _database = client.db('wotlk');
    console.log('Successfully connected to MongoDB.');
  },
  getDatabase: () => {
    return _database;
  },
};
