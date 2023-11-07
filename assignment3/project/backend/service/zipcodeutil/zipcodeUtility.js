'use strict';
const logger = require("../../logging/logger");


function parseZipcodeResponse(response, trackingId) {
    logger.info('Parsing zipcode response', {trackingId});
    let data = response.data;
    let parsedData = [];
    if (data.postalCodes){
        data.postalCodes.forEach((item) => {
            parsedData.push(item.postalCode)
        });
    }
    return parsedData;

}

module.exports = parseZipcodeResponse;