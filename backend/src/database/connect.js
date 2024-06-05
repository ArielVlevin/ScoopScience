


const { MongoClient } = require('mongodb');

const databaseName = 'Gelato';
const uri = "mongodb+srv://arielvlevin:izoehktcEV1puuVl@ariel.vhe225s.mongodb.net/?retryWrites=true&w=majority&appName=Ariel";
let client = null;
let db = null;

async function connectToDatabase() {
  if(!client){
    client = new MongoClient(uri);
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db(databaseName);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
 }
 return db;
}


async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
}


module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
}