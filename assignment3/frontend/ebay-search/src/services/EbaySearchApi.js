import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import {displayProgressBar, hideProgressBar} from "./ProgressBarHandler";
// todo: fetch results and console log it for now.

const URL = "http://localhost:8080";

const categoryOptions = {
  1: "All Categories",
  2: "Art",
  3: "Baby",
  4: "Books",
  5: "Clothing,Shoes & Accessories",
  6: "Health & Beauty",
  7: "Music",
  8: "Video Games & Console",
};

function filterCondition(condition) {
  const result = [];
  //for Unspecified don't pass anything
  if (condition.new) {
    result.push("New");
  }
  if (condition.used) {
    result.push("Used");
  }
  return result;
}

function filterShipping(shipping) {
  const result = [];
  if (shipping.freeShipping) {
    result.push("Free-Shipping");
  }
  if (shipping.localPickup) {
    result.push("Local-Pickup");
  }
  return result;
}

export const fetchAllResults = async (
  trackingId,
  keyword,
  category,
  condition,
  shipping,
  distance,
  zipcode
) => {
  try {
    console.log(
      `sending request to get all results ${trackingId} ${keyword} ${category} ${condition} ${shipping} ${distance} ${zipcode}`
    );
    const params = {
      trackingId: trackingId,
      keywords: keyword,
      category: categoryOptions[category],
      condition: filterCondition(condition),
      shipping: filterShipping(shipping),
      distance: distance,
      postalCode: zipcode,
    };
    console.log(params + " " + trackingId);
    displayProgressBar();
    const response = await axios.get(URL + "/ebay/findAllItems", {
      params: params,
    });
    hideProgressBar();
    console.log("received results from backend " + response.length);
    if (response.status == "200" && response.data.length > 0) {
      return response.data;
    } else {
      console.log(
        `findAllItems returned ${response.status} for trackingId ${trackingId} and keyword ${keyword}`
      );
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchItemDetails = async (itemId) => {
  try {
    
    const trackingId = uuidv4();
    console.log(`sending request to get item details ${itemId}`);
    const params = {
      itemId: itemId,
      trackingId: trackingId,
    };
    displayProgressBar();
    const response = await axios.get(URL + "/ebay/findItem", {
      params: params,
    });
    hideProgressBar();
    console.log("received results from backend ");
    if (response.status == "200") {
      console.dir(response.data);
      return response.data;
    } else {
      console.log(
        `findItemDetails returned ${response.status} for itemId ${itemId}`
      );
      console.dir(response);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const fetchSimilarItems = async (itemId) => {
  try {
    const trackingId = uuidv4();
    console.log(`sending request to get similar Items details ${itemId}`);
    const params = {
      itemId: itemId,
      trackingId: trackingId,
    };
    displayProgressBar();
    const response = await axios.get(URL + "/ebay/getSimilarItems", {
      params: params,
    });
    hideProgressBar();
    console.log("received results from backend ");
    if (response.status == "200") {
      console.dir(response.data);
      return response.data;
    } else {
      console.log(
        `fetchSimilarItems returned ${response.status} for itemId ${itemId}`
      );
      console.dir(response);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};