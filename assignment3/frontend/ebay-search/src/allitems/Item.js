import React, { useState } from "react";
import "./Item.css";
import "../assets/wishlist.svg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Tooltip } from 'react-tooltip'

function addItemToWishlist(item) {
  console.log("Adding item to wishlist " + item.itemId);
}

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

function Item({ item, onClick, itemType }) {
  function renderWishlistIcon() {
    // console.log("Adding wishList Btn based on state");
    if (itemType == "wishList") {
      return <RemoveShoppingCartIcon style={{ color: "burlywood" }} />;
    }
    //for results page perform the default action
    if (item.isWishListed) {
      return <RemoveShoppingCartIcon style={{ color: "burlywood" }} />;
    } else {
      return <AddShoppingCartIcon style={{ color: "black" }} />;
    }
  }

  const className = () => {
    if (itemType == "wishList") {
      return "item-card-container-wishlist";
    }
    if (itemType == "results") {
      return "item-card-container-results";
    }
  };

  if (item) {
    return (
      <div id={item.itemId} class="row" className={className()}>
        <div className="item-info ">{item.number}</div>
        <div className="item-info ">
          <img src={item.image} alt="" className="img-fluid allitem-item-img" />
        </div>
        <div className="item-info" id={item.id+"_title"}><a href="#" data-tooltip-id={item.id+"_title"} data-tooltip-content={item.title}>{truncateText(item.title, 35)}</a><Tooltip id={item.id+"_title"} /></div>
        <div className="item-info ">{item.price}</div>
        <div className="item-info ">{item.shipping}</div>
        {itemType == "results" ? (
          <div className="item-info ">{item.zip}</div>
        ) : (
          ""
        )}
        <div className="item-info ">
          <button
            type="button"
            className="btn btn-secondary"
            style={{ backgroundColor: "white" }}
            onClick={() => onClick(item)}
          >
            {renderWishlistIcon()}
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
