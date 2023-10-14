'use strict';
const dbClient=require('./dbClient');
const logger=require('../logging/logger');
const uuidv4 = require('uuid/v4');

const DB_NAME='hw3';
const COLLECTION_NAME='wishlist';
const dbOps={
    insertOne: async (req,res)=>{
        try{
            const doc = req.body;
            const trackingId = doc.trackingId || uuidv4();
            logger.info('dbOps.insertOne', {trackingId});
            const myDB = dbClient.db(DB_NAME);
            const Collection = myDB.collection(COLLECTION_NAME);

            doc._id = doc.itemId;
            const result = await Collection.insertOne(doc);
            logger.info('dbOps.insertOne', {trackingId, result});
            dbClient.close();
            res.send(result);

        }catch (error){
            logger.error('dbOps.insertOne', error);
            return null;
        }
    }
}

module.exports=dbOps;