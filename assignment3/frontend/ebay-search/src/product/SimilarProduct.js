import { fetchSimilarItems } from "../services/EbaySearchApi";

import React, { useEffect, useState } from "react";

const SimilarProduct = (props) => {

    const[similarProductState,setSimilarProductState]=useState({});

        
      
    if(props.productState.isSimilarProducts && !similarProductState.similarProducts){
      console.log("fetching similar products");
      fetchSimilarItems(props.item.itemId).then((details) => {
        console.log("Received similar product detail for item " + props.item.itemId);
        console.dir(details);
        setSimilarProductState((prevState)=>{
          return{
            ...prevState,
            similarProducts: details,
          }
        });
      });
    }
    if(props.productState.isSimilarProducts && similarProductState.similarProducts?.length>0){
      console.log("rendering similar products");
     return <div>Similar Products</div>
    }

};

export default SimilarProduct;
