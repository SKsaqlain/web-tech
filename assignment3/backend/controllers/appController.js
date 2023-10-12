'use strict';

const properties = require('../package.json');
const zipcode = require('../service/zipcode');

const controllers = {
    about: (req, res) => {
        const aboutInfo = {
            name: properties.name,
            version: properties.version,
        }
        res.json(aboutInfo);
    },

    getZipCode:(req,res)=>{
        zipcode.find(req,res);
        }
};

module.exports = controllers;