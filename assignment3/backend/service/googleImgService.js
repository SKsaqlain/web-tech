'use strict';
const axios = require('axios');
const logger = require('../logging/logger');
const uuidv4 = require('uuid/v4');

// const SEARCH_ENGINE_ID = "f23d1a81c39d4405c";
const SEARCH_ENGINE_ID ="b3b2f2c66c09b4cd3";

const API_KEY = "AIzaSyDeWgjuyt3y7bzLY27lB88YKTZ5Xm1BTfo";
const URL = "https://www.googleapis.com/customsearch/v1";

const googleImgService = {
    getPhotos: async (req, res) => {
        try {
            const trackingId = req.trackingId = req.query.trackingId || uuidv4();
            logger.info('getImages called', {trackingId});
            const keyword = req.query.keyword;
            logger.info(`Keyword: ${keyword}`, {trackingId});
            const params = {
                'q': keyword,
                'cx': SEARCH_ENGINE_ID,
                'imgSize': 'huge',
                'imgType': 'STOCK',
                'num': 8,
                'searchType': 'image',
                'key': API_KEY,
            };
            const response = await axios.get(URL, {params});
            if (response.status === 200) {
                logger.info('findItem returned status code 200')
                res.send(response.data);
            } else {
                logger.warn(`Warn findItem returned status code ${response.status}`)
                res.send("Error");
            }

        } catch (error) {
            logger.error('Error calling findItem', error)
            res.send("Error");
        }
    }
}

module.exports=googleImgService;