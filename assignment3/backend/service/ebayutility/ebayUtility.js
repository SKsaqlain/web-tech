'use strict';
const {log} = require("winston");
const logger = require("../../logging/logger");
const xmlbuilder = require("xmlbuilder");

const ENUM = {
    "Best Match": "BestMatch",
    "Price: highest first": "CurrentPriceHighest",
    "Price + Shipping: highest first": "PricePlusShippingHighest",
    "Price + Shipping: lowest first": "PricePlusShippingLowest",
    'New': "1000",
    'Used': "3000",
};
const CATEGORY_CODE = {
    'Art': "550",
    'Baby': "2984",
    'Books': "267",
    "Clothing, Shoes & Accessories": "11450",
    "Computers/Tablets & Networking": "58058",
    "Health & Beauty": "26395",
    'Music': "11233",
    "Video Games & Consoles": "1249",
};

// trackingId ,keyword, Category, Condition, Shipping Option, Distance, From
function createXMLRequestPayload(
    trackingId,
    keywords,
    category,
    condition,
    shipping,
    distance,
    postalCode
) {
    try {
        logger.info("Creating XML Request Payload", {trackingId});
        const root = xmlbuilder.create("findItemsAdvancedRequest");
        root.att('xmlns', 'http://www.ebay.com/marketplace/search/v1/services');
        root.att('version', '1.0');
        root.att('encoding', 'utf-8');

        root.ele("keywords", keywords);
        root.ele('outputSelector', 'SellerInfo');
        root.ele('outputSelector', 'StoreInfo');

        if (category && category.length >= 1) {
            logger.info("Adding Category tag");
            root.ele("categoryId", CATEGORY_CODE[category]);
        }
        if (postalCode && postalCode.length > 0) {
            logger.info("Adding From tag");
            root.ele("buyerPostalCode", postalCode);
        }

        if (distance) {
            if (distance.length == 0) {
                logger.info("Adding MaxDistance tag", {trackingId});
                createFilterTag(root, "MaxDistance", "10");
            } else {
                createFilterTag(root, "MaxDistance", distance);
            }
        }

        if (condition && condition.length >= 1) {
            logger.info("Adding Condition tag", {trackingId});
            const conditionTag = createFilterTag(
                root,
                "Condition",
                ENUM[condition[0]]
            );
            // TODO: donot add unspecified code below.
            if (condition.length > 1) {
                for (let i = 1; i < condition.length; i++) {
                    console.log("Adding Condition tag", ENUM[condition[i]])
                    conditionTag.ele("value", ENUM[condition[i]]);
                }
            }
        }

        if (shipping && shipping.length >= 1) {
            logger.info("Adding Shipping tag", {trackingId});
            if (shipping.includes("Free-Shipping")) {
                logger.info("Adding FreeShippingOnly tag", {trackingId});
                createFilterTag(root, "FreeShippingOnly", "true");
            }

            if (shipping.includes("Local-Pickup")) {
                logger.info("Adding LocalPickupOnly tag", {trackingId});
                createFilterTag(root, "LocalPickupOnly", "true");
            }

            // for unspecified do not add tag
        }

        createFilterTag(root, "HideDuplicateItems", "true");

        const paginationInput = root.ele("paginationInput");
        paginationInput.ele("entriesPerPage", "50");

        return root.end({pretty: true});
    } catch (error) {
        logger.error("Error creating XML Request Payload", {trackingId});
        throw new Error("Error creating XML Request Payload");
    }
}

function createFilterTag(root, name, value) {
    const filterTag = root.ele("itemFilter");
    filterTag.ele("name", name);
    filterTag.ele("value", value);
    return filterTag;
}

function parseFindAllItemResponse(response, trackingId) {
    logger.info("Parsing findAllItem response", {trackingId});
    if (!('searchResult' in response.findItemsAdvancedResponse[0]) || response.findItemsAdvancedResponse[0].searchResult[0]['@count'] == 0) {
        return null;
    }
    const items = response.findItemsAdvancedResponse[0].searchResult[0].item;
    let parsedItems = [];
    for (let i = 0; i < items.length; i++) {
        let itemData = {}
        itemData.itemId = items[i].itemId[0];
        itemData.title = items[i].title[0] || null;
        itemData.image = items[i].galleryURL[0] || null;
        itemData.price = items[i].sellingStatus[0].currentPrice[0].__value__ || null;
        itemData.shipping = items[i].shippingInfo[0].shippingServiceCost[0].__value__ || 'N/A';
        if (itemData.shipping == '0.0') {
            itemData.shipping = 'Free Shipping';
        } else if (itemData.shipping != 'N/A') {
            itemData.shipping = '$' + itemData.shipping;
        }
        itemData.zip = items[i].postalCode[0] || null;

        itemData.shippingDetails=getShippingDetails(items[i], itemData.shipping,trackingId);
        // itemData.shippingDetails = {
        //     'shippingCost': itemData.shipping,
        //     'shippingLocation': items[i].shippingInfo[0].shipToLocations[0] || null,
        //     'handlingTime': items[i].shippingInfo[0].handlingTime[0] || null,
        //     'expeditedShipping': items[i].shippingInfo[0].expeditedShipping[0] || null,
        //     'oneDatShipping': items[i].shippingInfo[0].oneDayShippingAvailable[0] || null,
        //     'returnsAccepted': items[i].returnsAccepted[0] || null,
        // }
        // logger.info("Parsed shipping details", {trackingId})
        itemData.sellerDetails=getSellerDetails(items[i],trackingId);

        // itemData.sellerDetails = {
        //     'feedBackScore': ('sellerInfo' in items[i]) ? items[i].sellerInfo[0].feedbackScore[0] || null : null,
        //     'popularity': ('sellerInfo' in items[i]) ? items[i].sellerInfo[0].positiveFeedbackPercent[0] || null : null,
        //     'feedbackRatingStar': ('sellerInfo' in items[i]) ? items[i].sellerInfo[0].feedbackRatingStar[0] || null : null,
        //     'topRated': ('sellerInfo' in items[i]) ? items[i].sellerInfo[0].topRatedSeller[0] || null : null,
        //     'storeName': ('storeInfo' in items[i]) ? items[i].storeInfo[0].storeName[0] || null : null,
        //     'buyProductAt': ('storeInfo' in items[i]) ? items[i].storeInfo[0].storeURL[0] || null : null,
        // }
        // logger.info("Parsed seller details", {trackingId})

        parsedItems.push(itemData);


    }
    logger.info("Parsed findAllItem response", {trackingId})
    return parsedItems;
}

function getShippingDetails(item, shippingCost,trackingId) {
    logger.info("Parsing shipping details", {trackingId})
    const shippingDetail={
        shippingCost: null,
        shippingLocation: null,
        handlingTime: null,
        expeditedShipping: null,
        oneDayShipping: null,
        returnsAccepted: null,

    };

        shippingDetail.shippingCost= shippingCost;
        if(item.shippingInfo && item.shippingInfo[0].shipToLocations){
            shippingDetail.shippingLocation= item.shippingInfo[0].shipToLocations[0];
        }
        if(item.shippingInfo && item.shippingInfo[0].handlingTime){
            shippingDetail.handlingTime= item.shippingInfo[0].handlingTime[0];
        }
        if(item.shippingInfo && item.shippingInfo[0].expeditedShipping){
            shippingDetail.expeditedShipping= item.shippingInfo[0].expeditedShipping[0];
        }
        if(item.shippingInfo && item.shippingInfo[0].oneDayShippingAvailable){
            shippingDetail.oneDayShipping= item.shippingInfo[0].oneDayShippingAvailable[0];
        }
        if(item.returnsAccepted){
            shippingDetail.returnsAccepted= item.returnsAccepted[0];
        }
        logger.info("Parsed shipping details", {trackingId})
        return shippingDetail;
}

function getSellerDetails(item, trackingId) {
    logger.info("Parsing seller details", {trackingId})
    const sellerDetails = {
        feedBackScore: null,
        popularity: null,
        feedbackRatingStar: null,
        topRated: null,
        storeName: null,
        buyProductAt: null,
    };
    if(item.sellerInfo && item.sellerInfo[0].feedbackScore){
        sellerDetails.feedBackScore= item.sellerInfo[0].feedbackScore[0];
    }
    if(item.sellerInfo && item.sellerInfo[0].positiveFeedbackPercent){
        sellerDetails.popularity= item.sellerInfo[0].positiveFeedbackPercent[0];
    }
    if(item.sellerInfo && item.sellerInfo[0].feedbackRatingStar){
        sellerDetails.feedbackRatingStar= item.sellerInfo[0].feedbackRatingStar[0];
    }
    if(item.sellerInfo && item.sellerInfo[0].topRatedSeller){
        sellerDetails.topRated= item.sellerInfo[0].topRatedSeller[0];
    }
    if(item.storeInfo && item.storeInfo[0].storeName){
        sellerDetails.storeName= item.storeInfo[0].storeName[0];
    }
    if(item.storeInfo && item.storeInfo[0].storeURL){
        sellerDetails.buyProductAt= item.storeInfo[0].storeURL[0];
    }
    logger.info("Parsed seller details", {trackingId})
    return sellerDetails;
}

module.exports = {
    createXMLRequestPayload,
    parseFindAllItemResponse,
};
