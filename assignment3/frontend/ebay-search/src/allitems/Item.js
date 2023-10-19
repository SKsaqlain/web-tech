import React, { useState } from "react";
import "./Item.css";

function Item({ item }) {
//   console.log("Adding Item to page");
  if (item) {
    return (
      <div id={item.itemId} className="item-card-container">
        <div>{item.number}</div>
        <div><img src={item.image} alt=""/></div>
        <div>{item.title}</div>
        <div>{item.price}</div>
        <div>{item.shipping}</div>
        <div>{item.zip}</div>
        <div>"wishlist-btn"</div>
      </div>
    );
  }
}

export default Item;
