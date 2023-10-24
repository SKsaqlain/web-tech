import axios from "axios";
import { async } from "q";
import { v4 as uuidv4 } from "uuid";

const INSERT_URL = "http://localhost:8080/mongodb/insertDoc";
const DEL_URL = "http://localhost:8080/mongodb/deleteDoc";
const GET_URL = "http://localhost:8080/mongodb/findDoc";
const GET_ALL_URL = "http://localhost:8080/mongodb/getAll";
const FIND_ALL_BY_ITEMIDS_URL =
  "http://localhost:8080/mongodb/findAllByItemIds";

export const AddItemToWishlist = async (item) => {
  try {
    const trackingId = uuidv4();
    const params = {
      body: JSON.stringify(item),
      trackingId: trackingId,
    };
    const response = await axios.get(INSERT_URL, { params: params });
    console.log("received response from backend " + response);
    return response.data;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const RemoveItemFromWishlist = async (item) => {
  try {
    const params = {
      itemId: item.itemId,
      trackingId: uuidv4(),
    };
    console.log(
      "Removing item from mongodb wishlist itemId " +
        item.itemId +
        " URL " +
        DEL_URL +
        " trackingId " +
        params.trackingId
    );
    const response = await axios.get(DEL_URL, {
      params: params,
    });
    console.log("received response from backend " + response.toString());
    return response.data;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const GetAllWishlistItems = async () => {
  try {
    const trackingId = uuidv4();
    console.log("fetching All wishlist data from db for trackingId " + trackingId);
    const params = {
      trackingId: trackingId,
    };
    const response = await axios
      .get(GET_ALL_URL, {
        params: params,
      });
      if(response.status=='200' && response.data.length>0)
      {
        console.log("received results from backend " +
        response.data.length +
        " for trackingId " +
        trackingId);
        return response.data;
      }else{
        console.log("No results received from backend " +
        response.data +
        " for trackingId " +
        trackingId);
        return [];
      }
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const GetWishlistItems = async (onReceivingResponse) => {
  try {
    const trackingId = uuidv4();
    console.log("fetching All results for trackingId " + trackingId);
    const params = {
      trackingId: trackingId,
    };
    const response = await axios
      .get(GET_ALL_URL, {
        params: params,
      })
      .then((rsp) => {
        console.log(
          "received results from backend " +
            rsp.data.length +
            " for trackingId " +
            trackingId
        );
        onReceivingResponse(rsp.data);
      });
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const FindAllWishlistItemsById = async (itemIds, trackingId) => {
  try {
    console.log(
      "fetching All results given itemIds for trackingId " + trackingId
    );
    const params = {
      trackingId: trackingId,
      itemIds: itemIds,
    };
    const response = await axios.get(FIND_ALL_BY_ITEMIDS_URL, {
      params: params,
    });
    console.log(
      "received results from backend for find All by itemIds" +
      response.data.length +
        " for trackingId " +
        trackingId
    );
    console.log("rsp.data is " + response.data);
    return response.data;
    // onReceivingResponse(rsp.data);
  } catch (error) {
    console.log(error);
    return "";
  }
};
