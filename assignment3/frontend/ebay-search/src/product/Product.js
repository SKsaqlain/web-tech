import React, { useState } from "react";

import ProductDetail from "./ProductDetail";


const Product = (props) => {
    console.log("Rendering Product component");
    console.dir(props.item);
    const [productState, setProductState] = useState({
       isDetailPage: true,
       isPhotosPage: false,
       isShippingPage: false,
       isSellr:false,
       isSimilarProducts:false,
    });


    const renderProductDetail = () => {
        if(productState.isDetailPage){
            return <ProductDetail item={props.item}/>
        }
    }
    return (
        <div>
            <h1>Product</h1>
            {renderProductDetail()}
        </div>
    );
}

export default Product;