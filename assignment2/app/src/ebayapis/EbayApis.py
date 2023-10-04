import sys

sys.path.append("../src")

import requests
from src.logadapter.logger import *
from src.ebayapis.ebay_oauth_token import OAuthToken
from src.ebayapis.ResponseFormats import *;

import json


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
            totalResultsFound = self.getResultsCount(rsp)
            LOGGER.info("Total results found: %s", totalResultsFound)
            items = self.getAllItems(rsp)
            LOGGER.info("Total items fetched: %s", len(items))

            filteredFields = {
                "totalResultsFound": 0,
                "items": []  # itemDict
            }

            filteredFields['totalResultsFound'] = totalResultsFound
            if(len(items) < 1):
                LOGGER.info("No items found")
                return ""
            for item in items:
                try:
                    # if (self.isItemValid(item) == False):
                    #     LOGGER.info("Invalid item found with id %s", item['itemId'][0])
                    #     continue
                    itemDict = dict()
                    itemDict['itemId'] = self.getItemId(item)
                    itemDict['itemImageUrl'] = self.getImageURL(item)
                    itemDict['itemTitle'] = self.getTitle(item)
                    itemDict['itemCategoryTag'] = self.getItemCategory(item)
                    itemDict['productLink'] = self.getItemURL(item)
                    itemDict['condition'] = self.getItemCondition(item)
                    itemDict['isTopRated'] = self.getIsItemTopRated(item)
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

    def getResultsCount(self, rsp):
        if ('paginationOutput' not in rsp or 'totalEntries' not in rsp['paginationOutput'][0]):
            LOGGER.warn("No paginationOutput or totalEntries field")
            return 0
        return rsp["paginationOutput"][0]["totalEntries"][0]
    def getAllItems(self,rsp):
        if ('searchResult' not in rsp or len(rsp['searchResult']) < 1 or 'item' not in rsp['searchResult'][0]):
            LOGGER.warn("No searchResult or item field")
            return []
        return rsp["searchResult"][0]["item"]
    def getItemId(self, item):
        if('itemId' in item and len(item['itemId']) >= 1 and item['itemId'] != None):
            return item['itemId'][0]
        LOGGER.warn("Item id not found for item %s", item)
        return ""

    def getTitle(self, item):
        if('title' in item and item['title'] != None):
            return item['title'][0]
        LOGGER.warn("Title not found for item %s", item)
        return ""

    def getItemCategory(self, item):
        if('primaryCategory' in item and item['primaryCategory'] != None and len(
                    item['primaryCategory']) >= 1 and 'categoryName' in item['primaryCategory'][0] and
                     item['primaryCategory'][0]['categoryName'] != None):
           return item['primaryCategory'][0]['categoryName'][0]
        LOGGER.warn("Category not found for item %s", item['itemId'][0])
        return ""

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
            return ""
        if (item['shippingInfo'] != None and 'shippingServiceCost' in item['shippingInfo'][0] and
                item['shippingInfo'][0]['shippingServiceCost'] != None and
                item['shippingInfo'][0]['shippingServiceCost'][0]['__value__'] != None):
            shipping = item['shippingInfo'][0]['shippingServiceCost'][0]['__value__']
        else:
            LOGGER.warn("Shipping not found")
            pass
        if (float(shipping) >= 0.01):
            return "${} (+ ${} for shipping)".format(price, shipping)
        return "${}".format(price)

    def getImageURL(self, item):
        if (item['galleryURL'] != None and len(item['galleryURL']) >= 1 and item['galleryURL'][0] != None):
            return item['galleryURL'][0]
        LOGGER.warn("Image URL not found returning default URL for item %s", item['itemId'][0])
        return ""

    def getItemURL(self, item):
        if('viewItemURL' in item and item['viewItemURL'] != None):
            return item['viewItemURL'][0]
        LOGGER.warn("Item URL not found for item %s", item['itemId'][0])
        return ""

    def getItemCondition(self, item):
        if('condition' in item and item['condition'] != None and len(
                    item['condition']) >= 1 and 'conditionDisplayName' in item['condition'][0] and item['condition'][0][
                         'conditionDisplayName'] != None):
            return item['condition'][0]['conditionDisplayName'][0]
        LOGGER.warn("Condition not found for item %s", item['itemId'][0])
        return ""

    def getIsItemTopRated(self, item):
        if('topRatedListing' in item and item['topRatedListing'] != None):
            return item['topRatedListing'][0]
        LOGGER.warn("Top rated listing not found for item %s", item['itemId'][0])
        return False


