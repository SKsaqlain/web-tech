'use strict';
const axios = require('axios');
const logger = require('../logging/logger');
const uuidv4 = require('uuid/v4');

const OAuthToken = require('./ebayutility/ebay_oauth_token');

const util = require('./ebayutility/ebayUtility');

const CLIENT_ID = 'SaqlainS-sms-PRD-d92d3cfae-360cb3a9';
const FIND_ALL_ITEMS_URL = "https://svcs.ebay.com/services/search/FindingService/v1";
const FIND_ITEM_URL = "https://open.api.ebay.com/shopping";
const CLINE_SECRET = "PRD-92d3cfae42a6-9cd3-4480-9d41-ea62";
const oauthToken = new OAuthToken(CLIENT_ID, CLINE_SECRET);
// const getAccessToken=() => {
//     const oauthToken = new OAuthToken(CLIENT_ID, CLINE_SECRET);
//
//     const token= await oauthToken.getApplicationToken()
//         .then((accessToken) => {
//             console.log('Access Token:', accessToken);
//             return accessToken;
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//
// }


const ebay = {
    findAllItems: async (req, res) => {
        //trackingId, keyword, category, condition, shipping, distance, postalCode
        try{
            const trackingId = req.trackingId = req.query.trackingId || uuidv4();
            const keyword = req.query.keywords;
            const category = req.query.category || [];
            const condition = req.query.condition || [];
            const shipping = req.query.shipping || [];
            const distance = req.query.distance || 0;
            const postalCode = req.query.postalCode || "";

            logger.info(`Keyword: ${keyword}`, {trackingId});
            logger.info(`Category: ${category.join(', ')}`, {trackingId});
            logger.info(`Condition: ${condition.join(', ')}`, {trackingId});
            logger.info(`Shipping: ${shipping.join(', ')}`, {trackingId});
            logger.info(`Distance: ${distance}`, {trackingId});
            logger.info(`Postal Code: ${postalCode}`, {trackingId});

            const payload = util.createXMLRequestPayload(trackingId, keyword, category, condition, shipping, distance, postalCode);
            logger.info(`Payload: ${payload}`, {trackingId});
            await axios.post(FIND_ALL_ITEMS_URL, payload, {
                headers: {
                    'Content-Type': 'application/xml'
                },
                params: {
                    'OPERATION-NAME': 'findItemsAdvanced',
                    'SERVICE-VERSION': '1.0.0',
                    'SECURITY-APPNAME': CLIENT_ID,
                    'RESPONSE-DATA-FORMAT': 'JSON',
                }
            }).then((response) => {
                // write function to parse response.
                res.send(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }catch (error) {
            console.error('Error calling findAllItems', error);
        }
    },

    findItemById: async (req, res) => {
        try{
            logger.info(`Finding item with itemId: ${req.query.itemId}`, "")
            const token = await oauthToken.getApplicationToken();
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
            const response = await axios.get(FIND_ITEM_URL, { params, headers });
            if (response.status === 200) {
                console.log('findItem returned status code 200');
                res.send(response.data);
            } else {
                console.warn(`findItem returned status code ${response.status}`);
                return new ResponseBody(response.status, '', null).toJSON();
            }
        }catch (error) {
        console.error('Error calling findItem', error);
        }
    }
}



module.exports = ebay;

