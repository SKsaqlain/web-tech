'use strict';
const dbClient=require('./dbClient');
const logger=require('../logging/logger');
const uuidv4 = require('uuid/v4');

const DB_NAME='hw3';
const COLLECTION_NAME='wishlist';
const dbOps={
    insertOne: async (req,res)=>{
        try{
            await dbClient.connect();
            const doc = req.body;
            const trackingId = doc.trackingId || uuidv4();
            logger.info('dbOps.insertOne', {trackingId});
            const myDB = dbClient.db(DB_NAME);
            const Collection = myDB.collection(COLLECTION_NAME);

            doc._id = doc.itemId;
            const result = await Collection.insertOne(doc);
            logger.info('dbOps.insertOne', {trackingId, result});
            await dbClient.close();
            res.send(result);

        }catch (error){
            logger.error('dbOps.insertOne', error);
            return null;
        }
    },
    findOne: async (req,res)=>{
        try{
            await dbClient.connect();
            const itemId=req.query.itemId;
            const trackingId = req.query.trackingId || uuidv4();
            logger.info(`dbOps.findOne for item ${itemId}`, {trackingId});
            const myDB = dbClient.db(DB_NAME);
            const Collection = myDB.collection(COLLECTION_NAME);
            const doc = {_id: itemId};
            const result = await Collection.findOne(doc);
            logger.info(`dbOps.findOne for item ${itemId}`, {trackingId});
            await dbClient.close();
            res.send(result);

        }catch (error){
            logger.error('dbOps.findOne', error);
            return null;
        }
    },
    deleteOne: async (req,res)=>{
        try{
            await dbClient.connect();
            const itemId=req.query.itemId;
            const trackingId = req.query.trackingId || uuidv4();
            logger.info(`dbOps.deleteOne for item ${itemId}`, {trackingId});
            const myDB = dbClient.db(DB_NAME);
            const Collection = myDB.collection(COLLECTION_NAME);
            const doc = {_id: itemId};
            const result = await Collection.deleteOne(doc);
            logger.info(`dbOps.deleteOne for item ${itemId}`, {trackingId});
            await dbClient.close();
            res.send(result);

        }catch (error){
            logger.error('dbOps.deleteOne', error);
            return null;
        }
    }

}

module.exports=dbOps;