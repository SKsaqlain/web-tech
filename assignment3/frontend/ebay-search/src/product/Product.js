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
    return (
        <div>
            {renderProductTitle()}
            {renderGoBackToListBtn()}
            {renderProductDetail()}
        </div>
    );
}

export default Product;