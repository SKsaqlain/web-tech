'use strict';

const controller = require('../controllers/appController');
const ebayController= require('../controllers/ebayController');
const gImgController= require('../controllers/gImgController');

module.exports = (app) => {
    app.route('/about').get(controller.about);
    app.route('/zipcode/:zipcode').get(controller.getZipCode);
    app.route('/ebay').get(ebayController.findAllItems);
    app.route('/ebay/findItem').get(ebayController.findItemById);
    app.route('/ebay/getSimilarItems').get(ebayController.getSimilarItems);
    app.route('/gImg').get(gImgController.getPhotos);
}