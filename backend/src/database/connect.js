


const { MongoClient } = require('mongodb');

const databaseName = 'Gelato';
const uri = "mongodb+srv://arielvlevin:izoehktcEV1puuVl@ariel.vhe225s.mongodb.net/?retryWrites=true&w=majority&appName=Ariel";
const options = {
  //maxPoolSize: 10 // Example pool size, adjust as needed
};
const client = new MongoClient(uri, options);
let db = null;


async function connectToDatabase() {
  try {
      await client.connect();
      //console.log('Connected to MongoDB');
      db = client.db(databaseName);
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
  }
  return db;
}

async function closeDatabaseConnection() {
  try {
      await client.close();
      db = null;
      //console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}


module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
}