import React, { useEffect, useState } from "react";

import { fetchItemDetails } from "../services/EbaySearchApi";

import "./ProductDetail.css";

//: todo filter out the fields from the items response check and perform is present and null check validation and return the map
const filterAndGetFieldsToDisplay = (productDetail) => {
  const fieldsToDisplay = new Map();

  //todo

  return fieldsToDisplay;
};

const ProductDetail = (props) => {
  const itemId = props.item.itemId;
  const [productDetail, setProductDetail] = useState(null);

  // useEffect(()=>{
  //   console.log("Fetching product details for item " + itemId);
  //   console.log("useEffect called");
  // },[])

  useEffect(() => {
    fetchItemDetails(itemId).then((details) => {
      console.log("Received product detail for item " + itemId);
      console.dir(details);
      setProductDetail(details);
    });
  }, []);

  const renderProductImage = () => {
    if (
      productDetail &&
      productDetail.productImages &&
      productDetail.productImages.length > 0
    ) {
      return (
        <>
          <div>Product Images</div>
          <div><a href="#"
            onClick={(e) => {
              e.preventDefault();
            }}>View Product Images Here</a></div>
        </>
      );
    }
  };

  const renderPrice = () => {
    if (productDetail && productDetail.price) {
      return (
        <>
          <div>Price</div>
          <div>${productDetail.price}</div>
        </>
      );
    }
  };

  const renderLocation = () => {
    if (productDetail && productDetail.location) {
      return (
        <>
          <div>Location</div>
          <div>{productDetail.location}</div>
        </>
      );
    }
  };

  const renderReturnPolicy = () => {
    if (productDetail && productDetail.returnPolicy) {
      return (
        <>
          <div>Return Policy</div>
          <div>{productDetail.returnPolicy}</div>
        </>
      );
    }
  };

  const renderItemSpecificDetails = () => {
    if (productDetail && productDetail.itemSpecifics) {
      return (
        <>
          {productDetail.itemSpecifics.map((itemSpecific) => {
            return (
              <>
                <div>{itemSpecific.name}</div>
                <div>{itemSpecific.value}</div>
              </>
            );
          })}
        </>
      );
    }
  };

  if (productDetail) {
    const fieldsToDisplay = new Map();

    return (
      <div key={itemId + "_itemDetails"} className="item-details-container">
        {renderProductImage()}
        {renderPrice()}
        {renderLocation()}
        {renderReturnPolicy()}
        {renderItemSpecificDetails()}
      </div>
    );
  }
};

export default ProductDetail;
