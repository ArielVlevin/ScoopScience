

const {connectToDatabase,closeDatabaseConnection } = require('./connect');


// Function to find data in MongoDB
async function findData(query, collectionName) {
   try {
      const db = await connectToDatabase();
      const collection = db.collection(collectionName);
     console.log('Found data:', result);
   } catch (error) {
     console.error('Error finding data:', error);
   }
 }




async function getDataByID(dataID, collectionName) {
   try {
      const db = await connectToDatabase();
      const collection = db.collection(collectionName);
      const result = await collection.findOne({ _id: dataID });
      await closeDatabaseConnection();
      return result;
   } catch (error) {
      console.error('Error retrieving recipe:', error);
      return null;
   }
 };

 module.exports = {
   findData,
   getDataByID,
 }