const logger=require('../../logging/logger')
const xmlbuilder = require('xmlbuilder');


const ENUM = {"Best Match": "BestMatch",
    "Price: highest first": "CurrentPriceHighest",
    "Price + Shipping: highest first": "PricePlusShippingHighest",
    "Price + Shipping: lowest first": "PricePlusShippingLowest",
    "New": "1000",
    "Used": "3000",
    "Very Good": "4000",
    "Good": "5000",
    "Acceptable": "6000"
};
// trackingId ,keyword, Category, Condition, Shipping Option, Distance, From
function createXMLRequestPayload(trackingId, keyword, category, condition, shipping, distance, postalCode) {
    try {
        logger.info("Creating XML Request Payload",{trackingId});
        const root = xmlbuilder.create('findItemsAdvancedRequest', { xmlns: 'http://www.ebay.com/marketplace/search/v1/services' });

        root.ele('keywords', keyword);
        root.ele('buyerPostalCode',postalCode)

        if (condition && condition.length >= 1) {
            logger.info("Adding Condition tag",{trackingId})
            const conditionTag = createFilterTag(root, 'Condition', ENUM[condition[0]]);
            if (condition.length > 1) {
                for (let i = 1; i < condition.length; i++) {
                    conditionTag.ele('value', ENUM[condition[i]]);
                }
            }
        }

        if (shipping && shipping.length >= 1) {
            if (shipping.includes('Free-Shipping')) {
                createFilterTag(root, 'FreeShippingOnly', 'true');
            if(shipping.includes('Local-Pickup'))
                createFilterTag(root, 'LocalPickupOnly', 'true');
            }
            // for unspecified do not add tag
        }

        // need to add category id here.

        if(distance && distance>0){
            createFilterTag(root,'MaxDistance',distance);
        }

        createFilterTag(root,'HideDuplicateItems','true');


        const paginationInput = root.ele('paginationInput');
        paginationInput.ele('entriesPerPage', '60');

        return root.end({ pretty: true });
    } catch (error) {
        logger.error('Error creating XML Request Payload',{trackingId});
        throw new Error('Error creating XML Request Payload');
    }
}

function createFilterTag(root, name, value) {
    const filterTag = root.ele('itemFilter');
    filterTag.ele('name', name);
    filterTag.ele('value', value);
    return filterTag;
}


module.exports={
    createXMLRequestPayload,
    createFilterTag,
};
