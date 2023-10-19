import React, { useState } from "react";
import "./Title.css";

function Title() {
    console.log("Adding Title");
  return (
    <div class="title-container">
      <div >#</div>
      <div >Images</div>
      <div >Title</div>
      <div >Price</div>
      <div >Shipping</div>
      <div >Zip</div>
      <div >Wishlist</div>
    </div>
  );
}

export default Title;
