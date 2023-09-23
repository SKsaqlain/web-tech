from flask import Blueprint
from flask import request
import logging

logging.basicConfig(level=logging.INFO)

FIND_ALL_ITEMS = Blueprint("findAllItems", __name__)


@FIND_ALL_ITEMS.route("/findAllItems", methods=["GET"])
def findAllItems():
    print(request.args)
    trackingId = request.args.get("trackingId")
    keyword = request.args.get("keyword")
    priceRangeFrom=request.args.get("from-number",None)
    priceRangeTo=request.args.get("to-number",None)
    condition=request.args.get("condition",None)
    seller=request.args.get("seller",None)
    shipping=request.args.get("shipping",None)
    sortBy=request.args.get("sort-by")

    logging.info("Tracking Id: %s", str(trackingId))
    logging.info("Keyword: %s", keyword)
    logging.info("Price Range From: %s", priceRangeFrom)
    logging.info("Price Range To: %s", priceRangeTo)
    logging.info("Condition: %s", condition)
    logging.info("Seller: %s", seller)
    logging.info("Shipping: %s", shipping)
    logging.info("Sort By: %s", sortBy)

    return ("", 200)

