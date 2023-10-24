import React, { useState } from "react";

import ProductDetail from "./ProductDetail";
import "./Product.css"

const Product = (props) => {
    console.log("Rendering Product component");
    console.dir(props.item);
    const [productState, setProductState] = useState({
       isDetailPage: true,
       isPhotosPage: false,
       isShippingPage: false,
       isSellerPage:false,
       isSimilarProducts:false,
    });


    const renderProductDetail = () => {
        if(productState.isDetailPage){
            return <ProductDetail item={props.item}/>
        }
    }
    const renderProductTitle = () => {
        
            return <div class="product-title-container">{props.item.title}</div>
        
    }

    const renderGoBackToListBtn=() => {
            return <button class="btn btn-light go-back-btn-container" onClick={(e) => {
                e.preventDefault();
                setProductState({
                    isDetailPage: false,
                    isPhotosPage: false,
                    isShippingPage: false,
                    isSellerPage:false,
                    isSimilarProducts:false,
                });
                props.onGoBackToBtnClick();
            }}>{"<"} List</button>
    }

    const renderNavBtns = () => {

        return <ul class="nav justify-content-end nav-tabs">
        <li class="nav-item">
          <a class={"nav-link "+(productState.isDetailPage?"active":"")} href="#"  onClick={(e) => {
                    e.preventDefault();
                    setProductState({
                        isDetailPage: true,
                        isPhotosPage: false,
                        isShippingPage: false,
                        isSellerPage:false,
                        isSimilarProducts:false,
                    });
                }}>Product</a>
        </li>
        <li class="nav-item">
          <a class={"nav-link "+(productState.isPhotosPage?"active":"")} href="#" onClick={(e) => {
                    e.preventDefault();
                    setProductState({
                        isDetailPage: false,
                        isPhotosPage: true,
                        isShippingPage: false,
                        isSellerPage:false,
                        isSimilarProducts:false,
                    });
                }}>Photos</a>
        </li>
        <li class="nav-item">
          <a class={"nav-link "+(productState.isShippingPage?"active":"")} href="#" onClick={(e) => {
                    e.preventDefault();
                    setProductState({
                        isDetailPage: false,
                        isPhotosPage: false,
                        isShippingPage: true,
                        isSellerPage:false,
                        isSimilarProducts:false,
                    });
                }}>Shipping</a>
        </li>
        <li class="nav-item">
          <a class={"nav-link "+(productState.isSellerPage?"active":"")} href="#" onClick={(e) => {
                    e.preventDefault();
                    setProductState({
                        isDetailPage: false,
                        isPhotosPage: false,
                        isShippingPage: false,
                        isSellerPage:true,
                        isSimilarProducts:false,
                    });
                }}>Seller</a>
        </li>
        <li class="nav-item">
          <a class={"nav-link "+(productState.isSimilarProducts?"active":"")} href="#" onClick={(e) => {
                    e.preventDefault();
                    setProductState({
                        isDetailPage: false,
                        isPhotosPage: false,
                        isShippingPage: false,
                        isSellerPage:false,
                        isSimilarProducts:true,
                    });
                }}>Similar Products</a>
        </li>
      </ul>;
    }
    return (
        <div>
            {renderProductTitle()}
            {renderGoBackToListBtn()}
            {renderNavBtns()}
            {renderProductDetail()}
        </div>
    );
}

export default Product;