


const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://arielvlevin:izoehktcEV1puuVl@ariel.vhe225s.mongodb.net/?retryWrites=true&w=majority&appName=Ariel';
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('Ariel'); 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}




// Function to insert data into MongoDB
async function insertData(data, collectionName) {
   try {
     const db = client.db();
     const collection = db.collection(collectionName);
     const result = await collection.insertOne(data);
     console.log('Inserted data:', result.insertedId);
   } catch (error) {
     console.error('Error inserting data:', error);
   }
 }


// Function to find data in MongoDB
async function findData(query, collectionName) {
   try {
     const db = client.db();
     const collection = db.collection(collectionName);
     const result = await collection.findOne(query);
     console.log('Found data:', result);
   } catch (error) {
     console.error('Error finding data:', error);
   }
 }
 
 // Function to update data in MongoDB
 async function updateData(filter, update, collectionName) {
   try {
     const db = client.db();
     const collection = db.collection(collectionName);
     const result = await collection.updateOne(filter, { $set: update });
     console.log('Updated data:', result.modifiedCount);
   } catch (error) {
     console.error('Error updating data:', error);
   }
 }
 
 // Function to delete data from MongoDB
 async function deleteData(filter, collectionName) {
   try {
     const db = client.db();
     const collection = db.collection(collectionName);
     const result = await collection.deleteOne(filter);
     console.log('Deleted data:', result.deletedCount);
   } catch (error) {
     console.error('Error deleting data:', error);
   }
 }
 
 module.exports = {
   connectToDatabase,
   insertData,
   findData,
   updateData,
   deleteData
 };