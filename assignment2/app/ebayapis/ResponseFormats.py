
ITEM={
    "itemId": "",
    "itemImageUrl": "",
    "itemTitle": "",
    "itemCategoryTag": "",
    "productLink": "",
    "condition": "",
    "isTopRated": "",
    "itemPrice": ""
}

FIND_ALL_ITEM_RESPONSE={
    "totalResultsFound": 0,
    "items": [] #itemDict
}



class ResponseBody:
    def __init__(self,status, message, data):
        self.status=status
        self.message=message
        self.data=data