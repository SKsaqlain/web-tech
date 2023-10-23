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
        <div class="row itemDetailsRow">
          <div class="col">Product Images</div>
          <div class="col"><a href="#"
            onClick={(e) => {
              e.preventDefault();

            }}>View Product Images Here</a></div>
        </div>
      );
    }
  };

  const renderPrice = () => {
    if (productDetail && productDetail.price) {
      return (
        <div class="row itemDetailsRow">
          <div class="col">Price</div>
          <div class="col">${productDetail.price}</div>
        </div>
      );
    }
  };

  const renderLocation = () => {
    if (productDetail && productDetail.location) {
      return (
        <div class="row itemDetailsRow">
          <div class="col">Location</div>
          <div class="col">{productDetail.location}</div>
        </div>
      );
    }
  };

  const renderReturnPolicy = () => {
    if (productDetail && productDetail.returnPolicy) {
      return (
        <div class="row itemDetailsRow">
          <div class="col">Return Policy</div>
          <div class="col">{productDetail.returnPolicy}</div>
        </div>
      );
    }
  };

  const renderItemSpecificDetails = () => {
    if (productDetail && productDetail.itemSpecifics) {
      return (
        <> 
          {productDetail.itemSpecifics.map((itemSpecific) => {
            return (
              <div class="row itemDetailsRow"> 
                <div class="col">{itemSpecific.name}</div>
                <div class="col">{itemSpecific.value}</div>
              </div >
            );
          })}
        </>
      );
    }
  };


  if (productDetail) {
    const fieldsToDisplay = new Map();

    return (
      <div key={itemId + "_itemDetails"} class="container item-details-container">
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
