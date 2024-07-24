// crudOperations.js

const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient');
const Recipe = require('../models/Recipe');

async function getDataByID(dataID, collectionName) {
   try {
     if (collectionName === 'Ingredients') {
       const result = await Ingredient.findById(dataID);
       return result;
     } else if (collectionName === 'Recipes') {
       const result = await Recipe.findById(dataID);
       return result;
     } else {
       throw new Error('Invalid collection name');
     }
   } catch (error) {
     console.error('Error retrieving document:', error);
     throw new Error('Failed to retrieve document');
   }
 }

async function getLastInsertedID(categoryName) {
  try {
    const result = await Ingredient.findOne({ category: categoryName }).sort({ _id: -1 }).exec();
    console.log('@@@@@@@@@Last inserted ID:', result._id);
    return result?._id || 0;

  } catch (error) {
    console.error('Error retrieving last inserted ID:', error);
    throw new Error('Failed to retrieve last inserted ID');
  }
}

async function insertData(data, collectionName) {
  try {
    const Model = mongoose.model(collectionName);
    const newData = new Model(data);
    const result = await newData.save();
    console.log('Inserted data:', result._id);
    return result._id;

  } catch (error) {
    console.error('Error inserting data:', error);
    throw new Error('Failed to insert data');
  }
}

async function updateData(filter, update, collectionName) {
  try {
    const Model = mongoose.model(collectionName);
    const result = await Model.updateOne(filter, { $set: update });
    console.log('Updated data:', result.nModified);
    return result.nModified;

  } catch (error) {
    console.error('Error updating data:', error);
    throw new Error('Failed to update data');
  }
}

async function deleteData(filter, collectionName) {
  try {
    const Model = mongoose.model(collectionName);
    const result = await Model.deleteOne(filter);
    console.log('Deleted data:', result.deletedCount);
    return result.deletedCount;

  } catch (error) {
    console.error('Error deleting data:', error);
    throw new Error('Failed to delete data');
  }
}

module.exports = {
  getDataByID,
  getLastInsertedID,
  insertData,
  updateData,
  deleteData
};