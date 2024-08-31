import axios from "axios";
import URL from "./URL";

// const URL="http://localhost:8080";
const baseURL = URL+"/zipcode";
const ipURL='https://ipinfo.io/json';
const TOKEN='ef88210eb36381'; 

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

export const getCurretZipCode= async () => {
  try{
    console.log("sending request to get current location zipCode ");
    const response = await axios.get(ipURL,{params:{'token':TOKEN}});
    // console.log("received zipCode from backend " + response);
    console.log("received zipCode from backend " + response.data.postal);
    return response.data.postal;

  }catch(error){
    console.log(error);
    return "";
  }

}

