import React, { useState } from "react";

const GoBackToListBtn=(props) => {
    return <button class="btn btn-light go-back-btn-container" onClick={(e) => {
        e.preventDefault();
        props.setProductState({
            isDetailPage: false,
            isPhotosPage: false,
            isShippingPage: false,
            isSellerPage:false,
            isSimilarProducts:false,
        });
        props.onGoBackToBtnClick();
    }}>{"<"} List</button>
}


export default GoBackToListBtn;