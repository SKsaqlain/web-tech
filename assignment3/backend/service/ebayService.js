'use strict';
const axios = require('axios');
const logger = require('../logging/logger');
const uuidv4 = require('uuid/v4');

const OAuthToken = require('./ebayutility/ebay_oauth_token');

const util = require('./ebayutility/ebayUtility');

const CLIENT_ID = 'SaqlainS-sms-PRD-d92d3cfae-360cb3a9';
const FIND_ALL_ITEMS_URL = "https://svcs.ebay.com/services/search/FindingService/v1";
const FIND_ITEM_URL = "https://open.api.ebay.com/shopping";
const GET_SIMILAR_ITEMS_URL = "https://svcs.ebay.com/MerchandisingService";
const CLINE_SECRET = "PRD-92d3cfae42a6-9cd3-4480-9d41-ea62";
const oauthToken = new OAuthToken(CLIENT_ID, CLINE_SECRET);


const ebay = {
    findAllItems: async (req, res) => {
        //trackingId, keyword, category, condition, shipping, distance, postalCode
        try {

            const trackingId = req.trackingId = req.query.trackingId || uuidv4();
            const keywords = req.query.keywords;
            const category = req.query.category ;
            const condition = JSON.parse(req.query.condition.replace(/(\w+)/g, '"$1"')) || [];
            const shippingString = req.query.shipping.replace(/([\w-]+)/g, '"$1"');
            const shipping = JSON.parse(shippingString) || [];
            // const shipping = JSON.parse(req.query.shipping.replace(/(\w+)/g, '"$1"')) || [];
            const distance = req.query.distance || 0;
            const postalCode = req.query.postalCode || "";

            logger.info(`Keyword: ${keywords}`, {trackingId});
            logger.info(`Category: ${category}`, {trackingId});
            logger.info(`Condition: ${condition}`, {trackingId});
            logger.info(`Shipping: ${shipping}`, {trackingId});
            logger.info(`Distance: ${distance}`, {trackingId});
            logger.info(`Postal Code: ${postalCode}`, {trackingId});

            const payload = util.createXMLRequestPayload(trackingId, keywords, category, condition, shipping, distance, postalCode);
            logger.info(`Payload: ${payload}`, {trackingId});
            const response = await axios.post(FIND_ALL_ITEMS_URL, payload, {
                headers: {
                    'Content-Type': 'application/xml'
                },
                params: {
                    'OPERATION-NAME': 'findItemsAdvanced',
                    'SERVICE-VERSION': '1.0.0',
                    'SECURITY-APPNAME': CLIENT_ID,
                    'RESPONSE-DATA-FORMAT': 'JSON',
                }
            });
            if (response.status === 200) {
                logger.info('findAllItems returned status code 200', {trackingId});
                const parsedResponse = util.parseFindAllItemResponse(response.data,trackingId);
                res.send(parsedResponse);
                // res.send(response.data);
            } else {
                logger.warn(`Warn findAllItems returned status code ${response.status}`, {trackingId});
                res.send("Error");
            }
        } catch (error) {
            console.error('Error calling findAllItems', error);
            res.send(null);
        }
    },

    findItemById: async (req, res) => {
        try {
            logger.info(`Finding item with itemId: ${req.query.itemId}`, "")
            const token = await oauthToken.getApplicationToken();
            const trackingId = req.trackingId = req.query.trackingId || uuidv4();
            const itemId = req.query.itemId;
            const params = {
                callname: 'GetSingleItem',
                responseencoding: 'JSON',
                appid: CLIENT_ID,
                siteid: '0',
                version: '967',
                ItemID: itemId,
                IncludeSelector: 'Description,Details,ItemSpecifics',
            };
            const headers = {
                'X-EBAY-API-IAF-TOKEN': token,
            };
            const response = await axios.get(FIND_ITEM_URL, {params, headers});
            if (response.status === 200) {
                logger.info('findItem returned status code 200')
                const parsedResponse=util.parseFindItemResponse(response.data,trackingId);
                res.send(parsedResponse);
                // res.send(response.data);
            } else {
                logger.warn(`Warn findItem returned status code ${response.status}`)
                res.send("Error");
            }
        } catch (error) {
            logger.error('Error calling findItem', error)
            res.send(null);
        }
    },

    getSimilarItems: async (req, res) => {
        try {
            const itemId = req.query.itemId;
            const trackingId = req.trackingId = req.query.trackingId || uuidv4();
            logger.info(`Finding similar items for itemId: ${itemId}`, {trackingId})
            const params = {
                'OPERATION-NAME': 'getSimilarItems',
                'SERVICE-NAME': 'MerchandisingService',
                'SERVICE-VERSION': '1.1.0',
                'CONSUMER-ID': CLIENT_ID,
                'RESPONSE-DATA-FORMAT': 'JSON',
                'REST-PAYLOAD': '',
                'itemId': itemId,
                'maxResults': 20,
            };

            const response = await axios.get(GET_SIMILAR_ITEMS_URL, {params});
            if (response.status === 200) {
                logger.info('findItem returned status code 200',{trackingId})

                const parsedResponse=util.parseGetSimilarItemsResponse(response.data,trackingId);
                // res.send(response.data);
                res.send(parsedResponse);
            } else {
                logger.warn(`Warn findItem returned status code ${response.status}`)
                res.send("Warn");
            }
        } catch (error) {
            logger.info('Error calling findItem', error)
            res.send(null);
        }
    }
}


module.exports = ebay;



