'use strict';

const properties = require('../package.json');
const zipcode = require('../service/zipcode');

const controllers = {
    getZipCode:(req,res)=>{
        zipcode.find(req,res);
        }
};

module.exports = controllers;