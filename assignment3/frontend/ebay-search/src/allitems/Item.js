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
        <div className="item-info col-1">{item.number}</div>
        <div className="item-info col-2"><img src={item.image} alt="" className="img-fluid" style={{width:"200px",height:"150px"}}/></div>
        <div className="item-info col-5">{truncateText(item.title,35)}</div>
        <div className="item-info col-1">{item.price}</div>
        <div className="item-info col-1">{item.shipping}</div>
        <div className="item-info col-1">{item.zip}</div>
        <div className="item-info col-1">"wishlist-btn"</div>
      </div>
    );
  }
}

export default Item;
