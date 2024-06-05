


const {connectToDatabase, closeDatabaseConnection} = require('./connect');

// Function to insert data into MongoDB
async function insertData(data, collectionName) {
  try {
      const db = await connectToDatabase();
      const collection = db.collection(collectionName);
      const result = await collection.insertOne({  _id: data.id, ...data});
      console.log('Inserted data:', result.insertedId);
      await closeDatabaseConnection();
   } catch (error) {
     console.error('Error inserting data:', error);
   }
 }


 // Function to update data in MongoDB
 async function updateData(filter, update, collectionName) {
   try {
      const db = await connectToDatabase();
      const collection = db.collection(collectionName);
     const result = await collection.updateOne(filter, { $set: update });
     await closeDatabaseConnection();
     console.log('Updated data:', result.modifiedCount);
   } catch (error) {
     console.error('Error updating data:', error);
   }
 }
 
 // Function to delete data from MongoDB
 async function deleteData(filter, collectionName) {
   try {
      const db = await connectToDatabase();
      const collection = db.collection(collectionName);     const result = await collection.deleteOne(filter);
     await closeDatabaseConnection();
     console.log('Deleted data:', result.deletedCount);
   } catch (error) {
     console.error('Error deleting data:', error);
   }
 }



 module.exports = {
   insertData,
   updateData,
   deleteData
 }