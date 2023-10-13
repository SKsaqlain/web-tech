'use strict';
const properties = require('../package.json');
const gImg = require('../service/gImgService');
const logger = require('../logging/logger');

const gImgController = {
    getPhotos(req, res) {
        gImg.getPhotos(req, res);
    },
}

module.exports=gImgController;