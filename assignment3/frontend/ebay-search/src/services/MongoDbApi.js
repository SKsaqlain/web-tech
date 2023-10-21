import axios from "axios";
import { async } from "q";
import { v4 as uuidv4 } from "uuid";

const INSERT_URL = "http://localhost:8080/mongodb/insertDoc";
const DEL_URL = "http://localhost:8080/mongodb/deleteDoc";
const GET_URL = "http://localhost:8080/mongodb/findDoc";
const GET_ALL_URL = "http://localhost:8080/mongodb/getAll";

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

export const GetWishlistItems =    async (onReceivingResponse) => {
    try{
        const trackingId = uuidv4();
        console.log("fetching All results for trackingId " + trackingId);
        const params = {
            trackingId: trackingId,
        };
        const response =   await axios.get(GET_ALL_URL, {
            params: params,
        }).then((rsp) => {
            console.log("received results from backend " + rsp.data.length + " for trackingId " + trackingId);
            onReceivingResponse(rsp.data);
        });
    }catch(error){
        console.log(error);
        return "";
    }
}
