import axios from "axios";
import { v4 as uuidv4 } from "uuid";


const URL="http://localhost:8080/googleImg";

export const fetchGoogleImages = async (keyword) => {
    try {
      const trackingId = uuidv4();
      console.log(`sending request to get item details ${itemId}`);
      const params = {
        itemId: itemId,
        keyword: keyword,
      };
      const response = await axios.get(URL , {
        params: params,
      });
  
      console.log("received results for Google Img Search from backend ");
      if (response.status == "200") {
        console.dir(response.data);
        return response.data;
      } else {
        console.log(
          `Google Img Search returned ${response.status} for itemId ${itemId}`
        );
        console.dir(response);
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };