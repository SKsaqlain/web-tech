import sys

sys.path.append("../app")

from flask import Blueprint
from flask import request
import uuid
import xml.etree.ElementTree as ET

from app.logadapter.logger import *
from app.ebayapis.EbayApis import *;

FIND_ITEM = Blueprint("findItem", __name__)

ebayApis= EbayApis()
@FIND_ITEM.route("/findItem", methods=["GET"])
def findItem():
    try:
        trackingId = request.args.get("trackingId", str(uuid.uuid4()))
        flask.g.trackingId = trackingId
        itemId = request.args.get("itemId")
        LOGGER.info("Tracking Id: %s", str(trackingId))
        LOGGER.info("Item Id: %s", itemId)
        response=ebayApis.callFindItem(itemId)
        LOGGER.info("Response: %s", response)
        return response
    except:
        LOGGER.error("Error calling findItem Api")
        return json.dumps(ResponseBody(500, "Error calling findItem", None).__dict__)
