import React, { useState } from "react";
import "./Item.css";

function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
  
    const truncatedText = text.substr(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(" ");
  
    return lastSpaceIndex === -1
      ? `${truncatedText}...`
      : `${truncatedText.substr(0, lastSpaceIndex)}...`;
  }

function Item({ item }) {
//   console.log("Adding Item to page");
  if (item) {
    return (
      <div id={item.itemId} class="row" className="item-card-container">
        <div className="item-info ">{item.number}</div>
        <div className="item-info "><img src={item.image} alt="" className="img-fluid allitem-item-img"/></div>
        <div className="item-info ">{truncateText(item.title,35)}</div>
        <div className="item-info ">{item.price}</div>
        <div className="item-info ">{item.shipping}</div>
        <div className="item-info ">{item.zip}</div>
        <div className="item-info ">"wishlist-btn"</div>
      </div>
    );
  }
}

export default Item;
