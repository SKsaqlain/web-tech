import React, { useState } from "react";
import "./Title.css";

function Title() {
    console.log("Adding Title");
  return (
    <div class="d-flex title-container">
      <div class="p-2">#</div>
      <div class="p-2">Images</div>
      <div class="p-2">Title</div>
      <div class="p-2">Price</div>
      <div class="p-2">Shipping</div>
      <div class="p-2">Zip</div>
      <div class="p-2">Wishlist</div>
    </div>
  );
}

export default Title;
