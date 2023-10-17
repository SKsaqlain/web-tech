const axios = require('axios')
const uuidv4 = require('uuid/v4');
const logger = require('../logging/logger');
const parseZipcodeResponse = require('./zipcodeutil/zipcodeUtility');

const USERNAME='sksaqlain25';

const zipcode = {
    find: (req, res) => {
        let zipCode=req.query.zipcode;
        let requestTrackingId=req.trackingId=req.query.trackingId || uuidv4();
        logger.info(`Received Zipcode: ${zipCode}`, {requestTrackingId});
        const URL = `http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=${zipCode}&maxRows=5&username=${USERNAME}&country=US`;
        axios
            .get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                logger.info(`Zipcode returned status code 200  ${response.data}`, {requestTrackingId});
                // res.send(response.data.postalCodes);
                let parsedResponse=parseZipcodeResponse(response, requestTrackingId);
                logger.info(`Zipcode parsed response len ${parsedResponse.length}`, {requestTrackingId});
                res.send(parsedResponse);
            })
            .catch((error) => {
                console.log(error);
            });
    },
};

module.exports=zipcode;