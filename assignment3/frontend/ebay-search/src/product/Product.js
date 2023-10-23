import React, { useState } from "react";



const Product = (props) => {
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
        </div>
    );
}

export default Product;