import React, { useState } from "react";

import ProductDetail from "./ProductDetail";
import "./Product.css";

import NavBtns from "./NavBtns";
import GoBackToListBtn from "./GoBackToListBtn";
import GoogleImgaes from "./GoogleImages";
import ShippingDetails from "./ShippingDetails";
import SellerDetail from "./SellerDetail";

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
    return <div class="product-title-container">{props.item.title}</div>;
  };

  return (
    <div class="product-container">
      {renderProductTitle()}
      <GoBackToListBtn
        setProductState={setProductState}
        onGoBackToBtnClick={props.onGoBackToBtnClick}
      />
      <NavBtns productState={productState} setProductState={setProductState} />
      {renderProductDetail()}
      {/* {renderGoogleImgaes()} */}
      <GoogleImgaes productState={productState} setProductState={setProductState} item={props.item}/>
      <ShippingDetails productState={productState} setProductState={setProductState} item={props.item}/>
      <SellerDetail productState={productState} setProductState={setProductState} item={props.item}/>
    </div>
  );
};

export default Product;
