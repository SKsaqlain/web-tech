import axios from "axios";

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
    const response = await axios.get(URL + "/ebay/findAllItems", {
      params: params,
    });
    console.log("received results from backend " + response.length);
    if(response.status=='200' && response.data.length>0)
    {return response.data}
    else{
        console.log(`findAllItems returned ${response.status} for trackingId ${trackingId} and keyword ${keyword}`);
        return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
