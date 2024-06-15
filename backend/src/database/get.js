

const {connectToDatabase,closeDatabaseConnection, isConnected } = require('./connect');



 async function getDataByID(dataID, collectionName) {
  try {
     // Validate parameters
     if (typeof dataID !== 'string' || typeof collectionName !== 'string') {
        throw new Error('Invalid parameters: dataID and collectionName must be strings');
     }

     // Connect to database
     const db = await connectToDatabase();
     const collection = await db.collection(collectionName);

     // Retrieve document
     const result = await collection.findOne({ _id: dataID });

     // Return result
     return result;

  } catch (error) {
     console.error('Error retrieving document:', error);
     throw new Error('Failed to retrieve document');
  }
};


async function getLastInsertedID(categoryName) {
  try{
    const db = await connectToDatabase();
    const collection = db.collection('Ingredients'); // Replace 'your_collection_name' with your actual collection name
    
    // Find the most recently inserted document with category 'dairy'
    const result = await collection.findOne({ category: categoryName }, { sort: { _id: -1 } });
    
    if (result) {
      return result._id; // Return the _id of the most recently inserted document
    } else {
      return null; // No document with category 'dairy' found
    }
  } catch (error) {
    console.error('Error retrieving last inserted ID:', error);
    throw new Error('Failed to retrieve last inserted ID');
  }
}


 module.exports = {
  getDataByID,
   getLastInsertedID
 }