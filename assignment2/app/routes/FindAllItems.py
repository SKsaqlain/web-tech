import sys
sys.path.append("../app")

from flask import Blueprint
from flask import request
from app.logging.logger import *;



FIND_ALL_ITEMS = Blueprint("findAllItems", __name__)


@FIND_ALL_ITEMS.route("/findAllItems", methods=["GET"])
def findAllItems():
    print(request.args)
    trackingId = request.args.get("trackingId")
    flask.g.trackingId = trackingId
    keyword = request.args.get("keyword")
    priceRangeFrom=request.args.get("from-number",None)
    priceRangeTo=request.args.get("to-number",None)
    condition=request.args.get("condition",None)
    seller=request.args.get("seller",None)
    shipping=request.args.get("shipping",None)
    sortBy=request.args.get("sort-by")

    LOGGER.info("Tracking Id: %s", str(trackingId))
    LOGGER.info("Keyword: %s", keyword)
    LOGGER.info("Price Range From: %s", priceRangeFrom)
    LOGGER.info("Price Range To: %s", priceRangeTo)
    LOGGER.info("Condition: %s", condition)
    LOGGER.info("Seller: %s", seller)
    LOGGER.info("Shipping: %s", shipping)
    LOGGER.info("Sort By: %s", sortBy)

    return ("", 200)

