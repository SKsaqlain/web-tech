import axios from "axios";

const baseURL = " http://localhost:8080/zipcode";

export const getZipCode = async (zipCode,trackingId) => {
  try {
    console.log("sending zipCode to backend " + zipCode + " trackingId " + trackingId);
    const response = await axios.get(baseURL, { params: { 'zipcode': zipCode ,'trackingId':trackingId} });
    console.log("received zipCode from backend " + response);
    return response.data;
  } catch (error) {
    console.log(error);
    return "";
  }
};
