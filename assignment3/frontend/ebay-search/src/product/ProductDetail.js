import React, { useEffect, useState } from "react";

import { fetchItemDetails } from "../services/EbaySearchApi";

import "./ProductDetail.css";

import ModalWithSlides from "./ModalWithSlides";


const ProductDetail = (props) => {
  const itemId = props.item.itemId;
  const [productDetail, setProductDetail] = useState({
    details: {},
    isModalActive: false,
  });



  useEffect(() => {
    fetchItemDetails(itemId).then((details) => {
      console.log("Received product detail for item " + itemId);
      console.dir(details);
      setProductDetail((prevState)=>{
        return{
          ...prevState,
          details: details,
          isModalActive: false,
        }
      });
    });
  }, []);

  const enableModalWithSlides = () => {
    setProductDetail((prevState)=>{
      return{
        ...prevState,
        isModalActive: true,
      }
    });
  }
  const renderProductImage = () => {
    if (
      productDetail.details &&
      productDetail.details.productImages &&
      productDetail.details.productImages.length > 0
    ) {
      return (
        <div class="row itemDetailsRow">
          <div class="col">Product Images</div>
          <div
            class="col product-images-link"
            data-toggle="modal"
            data-target="#productDetailsModal"

          ><button type="button" class="btn product-image-btn" data-toggle="modal" data-target="#productDetailsModal">View Product Images Here</button>
          </div>
        </div>
      );
    }
  };

  const renderPrice = () => {
    if (productDetail.details && productDetail.details.price) {
      return (
        <div class="row itemDetailsRow">
          <div class="col">Price</div>
          <div class="col">${productDetail.details.price}</div>
        </div>
      );
    }
  };

  const renderLocation = () => {
    if (productDetail.details && productDetail.details.location) {
      return (
        <div class="row itemDetailsRow">
          <div class="col">Location</div>
          <div class="col">{productDetail.details.location}</div>
        </div>
      );
    }
  };

  const renderReturnPolicy = () => {
    if (productDetail.details && productDetail.details.returnPolicy) {
      return (
        <div class="row itemDetailsRow">
          <div class="col">Return Policy</div>
          <div class="col">{productDetail.details.returnPolicy}</div>
        </div>
      );
    }
  };

  const renderItemSpecificDetails = () => {
    if (productDetail.details && productDetail.details.itemSpecifics) {
      return (
        <>
          {productDetail.details.itemSpecifics.map((itemSpecific) => {
            return (
              <div class="row itemDetailsRow">
                <div class="col">{itemSpecific.name}</div>
                <div class="col">{itemSpecific.value}</div>
              </div>
            );
          })}
        </>
      );
    }
  };

  if (productDetail.details) {
    return (
      <div
        key={itemId + "_itemDetails"}
        class="container item-details-container"
      >
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
