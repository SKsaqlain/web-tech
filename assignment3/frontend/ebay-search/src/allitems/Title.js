import React, { useState } from "react";
import "./Title.css";

function Title({ itemType }) {
  if (itemType == "wishList") {
    console.log("Adding Title for wishlist");
  } else {
    console.log("Adding Title for results");
  }
  const className=()=>{
    if(itemType=="wishList"){
      return "title-container-wishlist"
    }else{
      return "title-container-results"
    }
  }
  return (
    <div class={className()}>
      <div>#</div>
      <div>Images</div>
      <div>Title</div>
      <div>Price</div>
      <div>Shipping</div>
      {itemType=='results'?<div>Zip</div>:""}
      <div>Wishlist</div>
    </div>
  );
}

export default Title;
