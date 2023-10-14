'use strict';

const controller = require('../controllers/zipCodeController');
const ebayController= require('../controllers/ebayController');
const googleImgController= require('../controllers/googleImgController');

module.exports = (app) => {
    app.route('/zipcode').get(controller.getZipCode);
    app.route('/ebay/findAllItems').get(ebayController.findAllItems);
    app.route('/ebay/findItem').get(ebayController.findItemById);
    app.route('/ebay/getSimilarItems').get(ebayController.getSimilarItems);
    app.route('/googleImg').get(googleImgController.getPhotos);
}