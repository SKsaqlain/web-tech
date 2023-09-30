import sys

sys.path.append("../src")

from flask import Blueprint
from flask import request
import xml.etree.ElementTree as ET

from src.ebayapis.EbayApis import *
from src.customexception.CustomException import *

FIND_ALL_ITEMS = Blueprint("findAllItems", __name__)

enum = {"Best Match": "BestMatch",
        "Price: highest first": "CurrentPriceHighest",
        "Price + Shipping: highest first": "PricePlusShippingHighest",
        "Price + Shipping: lowest first": "PricePlusShippingLowest",
        "New": "1000",
        "Used": "3000",
        "Very Good": "4000",
        "Good": "5000",
        "Acceptable": "6000"
        }

ebayApis= EbayApis()

@FIND_ALL_ITEMS.route("/findAllItems", methods=["GET"])
def findAllItems():
    try:
        trackingId = request.args.get("trackingId", str(uuid.uuid4()))
        flask.g.trackingId = trackingId
        keyword = request.args.get("Key words")
        priceRangeFrom = request.args.get("Price Range From", None)
        priceRangeTo = request.args.get("Price Range To", None)
        condition = request.args.getlist("Condition", None)
        seller = request.args.getlist("Seller", None)
        shipping = request.args.getlist("Shipping", None)
        sortBy = request.args.get("Sort by")

        LOGGER.info("Tracking Id: %s", str(trackingId))
        LOGGER.info("Keyword: %s", keyword)
        LOGGER.info("Price Range From: %s", priceRangeFrom)
        LOGGER.info("Price Range To: %s", priceRangeTo)
        LOGGER.info("Condition: %s", condition)
        LOGGER.info("Seller: %s", seller)
        LOGGER.info("Shipping: %s", shipping)
        LOGGER.info("Sort By: %s", sortBy)

        payload=createXMLRequestPayload(trackingId, keyword, priceRangeFrom, priceRangeTo, condition, seller, shipping, sortBy)
        LOGGER.info("Payload: %s", payload)
        response=ebayApis.callFindAllItems(payload)
        LOGGER.info("Response: %s", response)
        return response
    except:
        LOGGER.error("Error calling findAllItems")
        return json.dumps(ResponseBody(500, "Error calling findAllItems", None).__dict__)
    # return ("", 200)


def createXMLRequestPayload(trakingId, keyword, priceRangeFrom, priceRangeTo, condition, seller, shipping, sortBy):
    try:
        LOGGER.info("Creating XML Request Payload")
        root = ET.Element("findItemsAdvancedRequest")
        root.set("xmlns", "http://www.ebay.com/marketplace/search/v1/services")

        ET.SubElement(root, "keywords").text="{}".format(keyword)


        if (priceRangeFrom is not None and len(priceRangeFrom)>=1):
            minPriceTag = createFilterTag(root, "MinPrice", priceRangeFrom)
            ET.SubElement(minPriceTag, "paramName").text = "CURRENCY"
            ET.SubElement(minPriceTag, "paramValue").text = "USD"
        if (priceRangeTo is not None and len(priceRangeTo)>=1):
            maxPriceTag = createFilterTag(root, "MaxPrice", priceRangeTo)
            ET.SubElement(maxPriceTag, "paramName").text = "CURRENCY"
            ET.SubElement(maxPriceTag, "paramValue").text = "USD"
        if (condition is not None and len(condition) >= 1):
            conditionTag = createFilterTag(root, "Condition", enum[condition[0]])
            if (len(condition) > 1):
                for i in range(1, len(condition)):
                    ET.SubElement(conditionTag, "value").text = enum[condition[i]]
        if (seller is not None and len(seller) >= 1):
            createFilterTag(root, "ReturnsAcceptedOnly", "true")

        # if (shipping is not None and len(shipping) >= 1 and "Free" in shipping):
        #     createFilterTag(root, "FreeShippingOnly", "true")

        if (shipping is not None and len(shipping) >= 1 and "Expedited" in shipping):
            createFilterTag(root, "ExpeditedShippingType", "Expedited")

        #adding sort order
        ET.SubElement(root, "sortOrder").text= enum[sortBy]


        paginationInput = ET.SubElement(root, "paginationInput")
        entriesPerPage = ET.SubElement(paginationInput, "entriesPerPage").text="20"
        # print(root)
        return ET.tostring(root, encoding='utf8', method='xml')
    except:
        LOGGER.error("Error creating XML Request Payload")
        raise XMLRequestCreationException("Error creating XML Request Payload")


def createFilterTag(root, name, value):
    filterTag = ET.SubElement(root, "itemFilter")
    ET.SubElement(filterTag, "name").text = name
    ET.SubElement(filterTag, "value").text = value
    return filterTag
