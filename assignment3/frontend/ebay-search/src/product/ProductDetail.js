import e from "express";
import React, { useEffect, useState } from "react";

import { fetchItemDetails } from "../services/EbaySearchApi";

const ProductDetail = (props) => {
  const itemId = props.item.itemId;
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const productDetail = await fetchItemDetails(itemId);
      console.log("Received product detail for item " + itemId);
      console.dir(productDetail);
      setProductDetail(productDetail);
    };
    fetchProductDetail();
  },[productDetail]);


  if(productDetail){
    return (
      <div>
        <h1>Product Detail</h1>
      </div>
    );
  }
};

export default ProductDetail;
