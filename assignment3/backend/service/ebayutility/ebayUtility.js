const { log } = require("winston");
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
    logger.info("Creating XML Request Payload", { trackingId });
    const root = xmlbuilder.create("findItemsAdvancedRequest");
    root.att('xmlns', 'http://www.ebay.com/marketplace/search/v1/services');
    root.att('version', '1.0');
    root.att('encoding', 'utf-8');

    root.ele("keywords", keywords);

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
        logger.info("Adding MaxDistance tag", { trackingId });
        createFilterTag(root, "MaxDistance", "10");
      } else {
        createFilterTag(root, "MaxDistance", distance);
      }
    }

    if (condition && condition.length >= 1) {
      logger.info("Adding Condition tag", { trackingId });
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
        logger.info("Adding Shipping tag", { trackingId });
      if (shipping.includes("Free-Shipping")) {
        logger.info("Adding FreeShippingOnly tag", { trackingId });
        createFilterTag(root, "FreeShippingOnly", "true");
      }

      if (shipping.includes("Local-Pickup")) {
        logger.info("Adding LocalPickupOnly tag", { trackingId });
        createFilterTag(root, "LocalPickupOnly", "true");
      }

      // for unspecified do not add tag
    }

    createFilterTag(root, "HideDuplicateItems", "true");

    const paginationInput = root.ele("paginationInput");
    paginationInput.ele("entriesPerPage", "60");

    return root.end({ pretty: true });
  } catch (error) {
    logger.error("Error creating XML Request Payload", { trackingId });
    throw new Error("Error creating XML Request Payload");
  }
}

function createFilterTag(root, name, value) {
  const filterTag = root.ele("itemFilter");
  filterTag.ele("name", name);
  filterTag.ele("value", value);
  return filterTag;
}

module.exports = {
  createXMLRequestPayload,
  createFilterTag,
};
