'use strict';
const logger = require('../logging/logger');
const dbCURD = require('../mongodb/dbCURD');


const dbController = {
    insertDoc(req,res){
        dbCURD.insertOne(req,res);
    },
    findDoc(req,res){
        dbCURD.findOne(req,res);
    },
    deleteDoc(req,res){
        dbCURD.deleteOne(req,res);
    }
}

module.exports=dbController;