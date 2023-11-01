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
import FacebookIcon from "@mui/icons-material/Facebook";

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
            <div class='mr-auto'>
              <GoBackToListBtn setProductState={setProductState} onGoBackToBtnClick={props.onGoBackToBtnClick} />
            </div>
          </div>
          <div class='col'>
            <div class='ml-auto' style={{ float: "right" }}>
              <div className='row'>
                <div className='col'>
                <div class="fb-share-button" data-href={props.item.viewItemURL} data-layout="" data-size=""><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.ebay.com%2Fitm%2F194935793906%3F_trkparms%3Damclksrc%253DITM%2526mehot%253Dpp%2526itm%253D194935793906%2526pmt%253D1%2526noa%253D1%2526brand%253DApple%26_trksid%3Dp0&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"><FacebookIcon style={{ color: "dodgerblue", fontSize:'3rem' }} /></a></div>
                  
                </div>
                <div className='col align-middle'>
                  <WishListBtn item={props.item} onWishListBtnClick={props.onWishListBtnClick}/>
                </div>
              </div>
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
