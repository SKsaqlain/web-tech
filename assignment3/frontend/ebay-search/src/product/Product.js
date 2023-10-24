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
        if(productState.isDetailPage){
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
    }

    const renderNavBtns = () => {

        return <ul class="nav justify-content-end nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" tabindex="-1">Disabled</a>
        </li>
      </ul>;
        
            return <div class="nav-btns-container">
                <button class="btn btn-light nav-btn" onClick={(e) => {
                    e.preventDefault();
                    setProductState({
                        isDetailPage: false,
                        isPhotosPage: true,
                        isShippingPage: false,
                        isSellerPage:false,
                        isSimilarProducts:false,
                    });
                }}>Photos</button>
                <button class="btn btn-light nav-btn" onClick={(e) => {
                    e.preventDefault();
                    setProductState({
                        isDetailPage: false,
                        isPhotosPage: false,
                        isShippingPage: true,
                        isSellerPage:false,
                        isSimilarProducts:false,
                    });
                }}>Shipping</button>
                <button class="btn btn-light nav-btn" onClick={(e) => {
                    e.preventDefault();
                    setProductState({
                        isDetailPage: false,
                        isPhotosPage: false,
                        isShippingPage: false,
                        isSellerPage:true,
                        isSimilarProducts:false,
                    });
                }}>Seller</button>
                <button class="btn btn-light nav-btn" onClick={(e) => {
                    e.preventDefault();
                    setProductState({
                        isDetailPage: false,
                        isPhotosPage: false,
                        isShippingPage: false,
                        isSellerPage:false,
                        isSimilarProducts:true,
                    });
                }}>Similar Products</button>
            </div>
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