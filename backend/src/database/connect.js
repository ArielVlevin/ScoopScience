const mongoose = require('mongoose');

const databaseName = 'Gelato';
const uri = "mongodb+srv://arielvlevin:izoehktcEV1puuVl@ariel.vhe225s.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Ariel";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, options);
    console.log('Connected to MongoDB with Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB with Mongoose:', error);
    throw error;
  }
}

async function closeDatabaseConnection() {
  try {
    await mongoose.disconnect();
    console.log('MongoDB connection closed with Mongoose');
  } catch (error) {
    console.error('Error closing MongoDB connection with Mongoose:', error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
};