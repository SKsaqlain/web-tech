'use strict';
const properties = require('../package.json');
const ebay = require('../service/ebayService');
const logger = require('../logging/logger');

const ebayController = {
    findAllItems(req, res) {
        ebay.findAllItems(req, res);
    },
    findItemById(req, res) {
        ebay.findItemById(req, res);
    }
}

module.exports=ebayController;