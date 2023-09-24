import sys

sys.path.append("../app")

import requests
from app.logadapter.logger import *
from app.ebayapis.ebay_oauth_token import OAuthToken

import json

class EbayApis:
    def __init__(self):
        self.findAllItemsUrl = "https://svcs.ebay.com/services/search/FindingService/v1"
        self.findItemUrl = "https://open.api.ebay.com/shopping"
        self.clientId = "SaqlainS-sms-PRD-d92d3cfae-360cb3a9"
        self.clientSecret = "PRD-92d3cfae42a6-9cd3-4480-9d41-ea62"
        self.tokenCreator = OAuthToken(self.clientId, self.clientSecret)

    def callFindAllItems(self, payload):
        applicationToken = self.tokenCreator.getApplicationToken()
        headers={
            'Content-Type':'application/xml'
        }
        params={
            'OPERATION-NAME': 'findItemsAdvanced',
            'SERVICE-VERSION': '1.0.0',
            'SECURITY-APPNAME': self.clientId,
            'RESPONSE-DATA-FORMAT': 'JSON',
        }
        response=requests.post(self.findAllItemsUrl,headers=headers,params=params,data=payload)
        jsonObj=json.loads(response.text)
        self.parseFindAllResponse(response)
        return response.text

    def parseFindAllResponse(self,response):
        try:
            jsonObj=json.loads(response.text)
            rsp=jsonObj["findItemsAdvancedResponse"][0]
            totalResultsFound=rsp["paginationOutput"][0]["totalEntries"][0]
            items=rsp["searchResult"][0]["item"]
            print(totalResultsFound)
        except:
            print("Error parsing response")




