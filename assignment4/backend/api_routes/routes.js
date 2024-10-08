'use strict';

const healthController = require('../controllers/healthController');
const zipController = require('../controllers/zipCodeController');
const ebayController= require('../controllers/ebayController');
const googleImgController= require('../controllers/googleImgController');
const mongoDBController= require('../controllers/dbController');

module.exports = (app) => {

    app.route('/health').get(healthController.getHealth);
    //zipcode pai
    app.route('/zipcode').get(zipController.getZipCode);

    //ebay apis
    app.route('/ebay/findAllItems').get(ebayController.findAllItems);
    app.route('/ebay/findItem').get(ebayController.findItemById);
    app.route('/ebay/getSimilarItems').get(ebayController.getSimilarItems);

    //google photos api
    app.route('/googleImg').get(googleImgController.getPhotos);

    //mongoDB apis
    app.route('/mongodb/insertDoc').get(mongoDBController.insertDoc);
    app.route('/mongodb/findDoc').get(mongoDBController.findDoc);
    app.route('/mongodb/findAllByItemIds').get(mongoDBController.findAllByItemIds);
    app.route('/mongodb/deleteDoc').get(mongoDBController.deleteDoc);
    app.route('/mongodb/getAll').get(mongoDBController.getAll);

}