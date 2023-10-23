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
    return (
        <div>
            {renderProductTitle()}
            {renderProductDetail()}
        </div>
    );
}

export default Product;