'use strict';
const properties = require('../package.json');
const gImg = require('../service/googleImgService');
const logger = require('../logging/logger');

const googleImgController = {
    getPhotos(req, res) {
        gImg.getPhotos(req, res);
    },
}

module.exports=googleImgController;