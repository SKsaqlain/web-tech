import React, { useState } from "react";

function ResultWishlistBtn({btnName,isActive,onClick}){
    function handleOnClick(){
        onClick();
    }
    const styleAttr=isActive? "btn btn-dark" : "btn btn-light";
    return (
        <div>
            <button  class={styleAttr} onClick={handleOnClick}>{btnName}</button>
        </div>
    );
}

export default ResultWishlistBtn;