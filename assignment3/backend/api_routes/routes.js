'use strict';

const controller = require('../controllers/appController');
const ebayController= require('../controllers/ebayController');

module.exports = (app) => {
    app.route('/about').get(controller.about);
    app.route('/zipcode/:zipcode').get(controller.getZipCode);
    app.route('/ebay').get(ebayController.findAllItems);
}