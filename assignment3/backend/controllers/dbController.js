'use strict';
const logger = require('../logging/logger');
const dbCURD = require('../mongodb/dbCURD');


const dbController = {
    insertDoc(req,res){
        dbCURD.insertOne(req,res);
    }
}

module.exports=dbController;