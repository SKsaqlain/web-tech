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
                resp = self.parseFindAllItemsResponse(response)
                return json.dumps(ResponseBody(200, "Success", resp).__dict__)
            else:
                LOGGER.warn("findAllItems returned status code %s", response.status_code)
                return json.dumps(ResponseBody(response.status_code, "", None).__dict__)

        except:
            LOGGER.error("Error calling findAllItems")
            return json.dumps(ResponseBody(500, "Error calling findAllItems", None).__dict__)

    def callFindItem(self, itemId):
        try:
            LOGGER.info("Creating findItem request")
            applicationToken = self.tokenCreator.getApplicationToken()
            params = {
                'callname': 'GetSingleItem',
                'responseencoding': 'JSON',
                'appid': self.clientId,
                'siteid': '0',
                'version': '967',
                'ItemID': itemId,
                'IncludeSelector': 'Description,Details,ItemSpecifics'
            }
            headers = {
                "X-EBAY-API-IAF-TOKEN": applicationToken
            }
            response = requests.get(self.findItemUrl, params=params, headers=headers)
            # return response.text
            if (response.status_code == 200):
                LOGGER.info("findItem returned status code 200")
                resp = self.parseFindItemResponse(response)
                return json.dumps(ResponseBody(200, "Success", resp).__dict__)
            else:
                LOGGER.warn("findItem returned status code %s", response.status_code)
                return json.dumps(ResponseBody(response.status_code, "", None).__dict__)

        except:
            LOGGER.error("Error calling findItem")
            return json.dumps(ResponseBody(500, "Error calling findItem", None).__dict__)

    def parseFindItemResponse(self, response):
        try:
            jsonObj = json.loads(response.text)
            item = jsonObj["Item"]
            LOGGER.info("Item fetched: %s", item['ItemID'])
            rspDict = dict()
            if ('PictureURL' in item and item['PictureURL'] != None and len(item['PictureURL']) >= 1 and
                    item['PictureURL'][0] != None):
                rspDict['photo'] = item['PictureURL'][0]
            if ('ViewItemURLForNaturalSearch' and item['ViewItemURLForNaturalSearch'] != None):
                rspDict['productLink'] = item['ViewItemURLForNaturalSearch']
            if ('Title' in item and item['Title'] != None):
                rspDict['title'] = item['Title']
            if ('SubTitle' in item and item['SubTitle'] != None):
                rspDict['subTitle'] = item['SubTitle']
            if ('Location' in item and item['Location'] != None):
                rspDict['location'] = item['Location']
            if ('Seller' in item and item['Seller'] is not None and 'UserID' in item['Seller'] and item['Seller'][
                'UserID'] is not None):
                rspDict['seller'] = item['Seller']['UserID']
            if ('ReturnPolicy' in item and item['ReturnPolicy'] != None and 'ReturnsAccepted' in item[
                'ReturnPolicy'] and item['ReturnPolicy']['ReturnsAccepted'] != None):
                rspDict['returnPolicy'] = item['ReturnPolicy']['ReturnsAccepted']
            if ('ItemSpecifics' in item and item['ItemSpecifics'] != None and 'NameValueList' in item[
                'ItemSpecifics'] and item['ItemSpecifics']['NameValueList'] != None):
                for nameValue in item['ItemSpecifics']['NameValueList']:
                    if (nameValue['Name'] != None and len(nameValue['Name']) >= 1):
                        rspDict[nameValue['Name']] = " ,".join(nameValue['Value'])

            return rspDict

        except:
            LOGGER.error("Error parsing response")
            raise Exception("Error parsing response")

    def parseFindAllItemsResponse(self, response):
        try:
            jsonObj = json.loads(response.text)
            if ('findItemsAdvancedResponse' not in jsonObj):
                LOGGER.warn("No findItemsAdvancedResponse")
                return ""
            rsp = jsonObj["findItemsAdvancedResponse"][0]
            if ('paginationOutput' not in rsp or 'totalEntries' not in rsp['paginationOutput'][0]):
                LOGGER.warn("No paginationOutput or totalEntries field")
                return ""
            totalResultsFound = rsp["paginationOutput"][0]["totalEntries"][0]
            LOGGER.info("Total results found: %s", totalResultsFound)
            if ('searchResult' not in rsp or len(rsp['searchResult']) < 1 or 'item' not in rsp['searchResult'][0]):
                LOGGER.warn("No searchResult or item field")
                return ""
            items = rsp["searchResult"][0]["item"]
            LOGGER.info("Total items fetched: %s", len(items))

            filteredFields = {
                "totalResultsFound": 0,
                "items": []  # itemDict
            }

            filteredFields['totalResultsFound'] = totalResultsFound

            for item in items:
                try:
                    if (self.isItemValid(item) == False):
                        LOGGER.info("Invalid item found with id %s", item['itemId'][0])
                        continue
                    itemDict = dict()
                    itemDict['itemId'] = item['itemId'][0]
                    itemDict['itemImageUrl'] = self.getImageURL(item)
                    itemDict['itemTitle'] = item['title'][0]
                    itemDict['itemCategoryTag'] = item['primaryCategory'][0]['categoryName'][0]
                    itemDict['productLink'] = item['viewItemURL'][0]
                    itemDict['condition'] = item['condition'][0]['conditionDisplayName'][0]
                    itemDict['isTopRated'] = item['topRatedListing'][0]
                    itemDict['itemPrice'] = self.getItemPrice(item)
                    filteredFields['items'].append(itemDict)
                except:
                    LOGGER.warn("Error parsing item %s", item['itemId'][0])
                    continue
            LOGGER.info("Total items after filtering: %s", len(filteredFields['items']))
            return filteredFields
        except:
            LOGGER.error("Error parsing response")
            raise Exception("Error parsing response")

    def getItemPrice(self, item):
        shipping = 0.0
        price = 0.0
        LOGGER.info("Getting price for item %s", item['itemId'][0])
        if (item['sellingStatus'] != None and 'currentPrice' in item['sellingStatus'][0] and item['sellingStatus'][0][
            'currentPrice'] != None and
                item['sellingStatus'][0]['currentPrice'][0]['__value__'] != None):
            price = item['sellingStatus'][0]['currentPrice'][0]['__value__']
        else:
            LOGGER.warn("Price not found")
            raise Exception("Price not found")
        if (item['shippingInfo'] != None and 'shippingServiceCost' in item['shippingInfo'][0] and
                item['shippingInfo'][0]['shippingServiceCost'] != None and
                item['shippingInfo'][0]['shippingServiceCost'][0]['__value__'] != None):
            shipping = item['shippingInfo'][0]['shippingServiceCost'][0]['__value__']
        else:
            LOGGER.warn("Shipping not found")
            raise Exception("Shipping not found")
        if (float(shipping) >= 0.01):
            return "${} (+ ${} for shipping)".format(price, shipping)
        return "${}".format(price)

    def getImageURL(self, item):
        if (item['galleryURL'] != None and len(item['galleryURL']) >= 1 and item['galleryURL'][0] != None):
            return item['galleryURL'][0]
        LOGGER.warn("Image URL not found returning default URL for item %s", item['itemId'][0])
        # todo: replace with default image url
        return ""

    def isItemValid(self, item):
        if (item != None
                and ('itemId' in item and len(item['itemId']) >= 1 and item['itemId'] != None)
                and ('title' in item and item['title'] != None)
                and ('primaryCategory' in item and item['primaryCategory'] != None and len(
                    item['primaryCategory']) >= 1 and 'categoryName' in item['primaryCategory'][0] and
                     item['primaryCategory'][0]['categoryName'] != None)
                and ('viewItemURL' in item and item['viewItemURL'] != None)
                and ('condition' in item and item['condition'] != None and len(
                    item['condition']) >= 1 and 'conditionDisplayName' in item['condition'][0] and item['condition'][0][
                         'conditionDisplayName'] != None)
                and ('topRatedListing' in item and item['topRatedListing'] != None)
                and ('sellingStatus' and item['sellingStatus'] != None and len(item['sellingStatus'][0]) >= 1 and
                     item['sellingStatus'][0]['convertedCurrentPrice'] != None)):
            LOGGER.info("Item %s is valid", item['itemId'][0])
            return True
        LOGGER.warn("Item %s is invalid ", item)
        return False
