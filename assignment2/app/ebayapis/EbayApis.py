import sys

sys.path.append("../app")

import requests
from app.logadapter.logger import *
from app.ebayapis.ebay_oauth_token import OAuthToken
from app.ebayapis.ResponseFormats import *;

import json
from flask import jsonify


class EbayApis:
    def __init__(self):
        LOGGER.info("Initializing EbayApis")
        self.findAllItemsUrl = "https://svcs.ebay.com/services/search/FindingService/v1"
        self.findItemUrl = "https://open.api.ebay.com/shopping"
        self.clientId = "SaqlainS-sms-PRD-d92d3cfae-360cb3a9"
        self.clientSecret = "PRD-92d3cfae42a6-9cd3-4480-9d41-ea62"
        self.tokenCreator = OAuthToken(self.clientId, self.clientSecret)

    def callFindAllItems(self, payload):
        try:
            LOGGER.info("Creating findAllItems request")
            applicationToken = self.tokenCreator.getApplicationToken()
            headers = {
                'Content-Type': 'application/xml'
            }
            params = {
                'OPERATION-NAME': 'findItemsAdvanced',
                'SERVICE-VERSION': '1.0.0',
                'SECURITY-APPNAME': self.clientId,
                'RESPONSE-DATA-FORMAT': 'JSON',
            }
            response = requests.post(self.findAllItemsUrl, headers=headers, params=params, data=payload)
            if (response.status_code == 200):
                LOGGER.info("findAllItems returned status code 200")
                resp = self.parseFindAllResponse(response)
                return json.dumps(ResponseBody(200, "Success", resp).__dict__)
            else:
                LOGGER.warn("findAllItems returned status code %s", response.status_code)
                return json.dumps(ResponseBody(response.status_code, "", None).__dict__)

        except:
            LOGGER.error("Error calling findAllItems")
            return json.dumps(ResponseBody(500, "Error calling findAllItems", None).__dict__)

    def parseFindAllResponse(self, response):
        try:
            jsonObj = json.loads(response.text)
            rsp = jsonObj["findItemsAdvancedResponse"][0]
            totalResultsFound = rsp["paginationOutput"][0]["totalEntries"][0]
            LOGGER.info("Total results found: %s", totalResultsFound)
            items = rsp["searchResult"][0]["item"]
            LOGGER.info("Total items fetched: %s", len(items))

            filteredFields = FIND_ALL_ITEM_RESPONSE.copy()
            filteredFields['totalResultsFound'] = totalResultsFound

            for item in items:
                if (self.isItemValid(item) == False):
                    LOGGER.info("Invalid item found with id %s", item['itemId'][0])
                    continue
                itemDict = ITEM.copy()
                itemDict['itemId'] = item['itemId'][0]
                itemDict['itemImageUrl'] = self.getImageURL(item)
                itemDict['itemTitle'] = item['title'][0]
                itemDict['itemCategoryTag'] = item['primaryCategory'][0]['categoryName'][0]
                itemDict['productLink'] = item['viewItemURL'][0]
                itemDict['condition'] = item['condition'][0]['conditionDisplayName'][0]
                itemDict['isTopRated'] = item['topRatedListing'][0]
                itemDict['itemPrice'] = item['sellingStatus'][0]['currentPrice'][0]['__value__']
                filteredFields['items'].append(itemDict)
            return filteredFields
        except:
            LOGGER.error("Error parsing response")
            raise Exception("Error parsing response")

    def getItemPrice(self, item):
        price = ""
        shipping = ""
        if (item['sellingStatus'] != None and item['sellingStatus'][0]['currentPrice'] != None and
                item['sellingStatus'][0]['currentPrice'][0]['__value__'] != None):
            price = item['sellingStatus'][0]['currentPrice'][0]['__value__']
        else:
            LOGGER.warn("Price not found")
            raise Exception("Price not found")
        if (item['shippingInfo'] != None and item['shippingInfo'][0]['shippingServiceCost'] != None and
                item['shippingInfo'][0]['shippingServiceCost'][0]['__value__'] != None):
            shipping = item['shippingInfo'][0]['shippingServiceCost'][0]['__value__']
        else:
            LOGGER.warn("Shipping not found")
            raise Exception("Shipping not found")
        if (float(shipping) >= 0.01):
            return "%s (+ %s for shipping)".format(price, shipping)
        return price

    def getImageURL(self, item):
        if (item['galleryURL'] != None and len(item['galleryURL']) >= 1 and item['galleryURL'][0] != None):
            return item['galleryURL'][0]
        LOGGER.warn("Image URL not found returning default URL for item %s", item['itemId'][0])
        # todo: replace with default image url
        return "default url"

    def isItemValid(self, item):
        if (item != None
                and item['itemId'] != None
                and item['title'] != None
                and item['primaryCategory'] != None and item['primaryCategory'][0]['categoryName'] != None
                and item['viewItemURL'] != None
                and item['condition'] != None and item['condition'][0]['conditionDisplayName'] != None
                and item['topRatedListing'] != None
                and item['sellingStatus'] != None and item['sellingStatus'][0]['convertedCurrentPrice'] != None):
            return True
        return False
