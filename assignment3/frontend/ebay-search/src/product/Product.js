import React, { useState } from "react";

import ProductDetail from "./ProductDetail";
import "./Product.css";

import NavBtns from "./NavBtns";
import GoBackToListBtn from "./GoBackToListBtn";
import GoogleImgaes from "./GoogleImages";
import ShippingDetails from "./ShippingDetails";
import SellerDetail from "./SellerDetail";
import SimilarProduct from "./SimilarProduct";
import WishListBtn from "./WishListBtn";

const Product = (props) => {
  console.log("Rendering Product component");
  console.dir(props.item);
  const [productState, setProductState] = useState({
    isDetailPage: true,
    isPhotosPage: false,
    isShippingPage: false,
    isSellerPage: false,
    isSimilarProducts: false,
    googleImageList: [],
  });

  const renderProductDetail = () => {
    if (productState.isDetailPage) {
      return <ProductDetail item={props.item} />;
    }
  };
  const renderProductTitle = () => {
    return <div class='product-title-container'>{props.item.title}</div>;
  };

  const renderBtns = () => {
    return (
      <div class='item-detial-btn-container'>
        <div class='row'>
          <div class='col'>
              <div class="mr-auto">
                <GoBackToListBtn setProductState={setProductState} onGoBackToBtnClick={props.onGoBackToBtnClick} />
              </div>
          </div>
          <div class='col'>
            <div class="ml-auto" style={{float:'right'}}>
              <WishListBtn item={props.item} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div class='product-container'>
      {renderProductTitle()}

      {/* <GoBackToListBtn setProductState={setProductState} onGoBackToBtnClick={props.onGoBackToBtnClick} />
      <WishListBtn item={props.item} /> */}
      {renderBtns()}
      <NavBtns productState={productState} setProductState={setProductState} />
      {renderProductDetail()}
      <GoogleImgaes productState={productState} setProductState={setProductState} item={props.item} />
      <ShippingDetails productState={productState} setProductState={setProductState} item={props.item} />
      <SellerDetail productState={productState} setProductState={setProductState} item={props.item} />
      <SimilarProduct productState={productState} setProductState={setProductState} item={props.item} />
    </div>
  );
};

export default Product;
