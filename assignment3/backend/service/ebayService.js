const axios = require('axios');
const logger = require('../logging/logger');
const uuidv4 = require('uuid/v4');

const util = require('./ebayutility/ebayUtility');

const CLIENT_ID = 'SaqlainS-sms-PRD-d92d3cfae-360cb3a9';
const FIND_ALL_ITEMS_URL = "https://svcs.ebay.com/services/search/FindingService/v1";

const ebay = {
    findAllItems: (req, res) => {
        //trackingId, keyword, category, condition, shipping, distance, postalCode
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
        axios.post(FIND_ALL_ITEMS_URL, payload, {
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
    }
}

module.exports = ebay;

