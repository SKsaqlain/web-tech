import React, { useState } from "react";
import "./WishListItem.css";
import "../assets/wishlist.svg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Tooltip } from "react-tooltip";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  const truncatedText = text.substr(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(" ");

  return lastSpaceIndex === -1 ? `${truncatedText}...` : `${truncatedText.substr(0, lastSpaceIndex)}...`;
}

const WishListItem = (props) => {
  const { item, onIconClick, index, onLinkClick } = props;

  function renderWishlistIcon() {
    return <RemoveShoppingCartIcon style={{ color: "burlywood" }} />;
  }

  if (item) {
  
    return (
      <div id={item.itemId} class='row' className={item.itemId===props.selectedItemId?"selected-item item-card-container-wishlist":"item-card-container-wishlist"}>
        <div className='item-info '>{index+1}</div>
        <div className='item-info '>
          <a href={item.image} target='_blank' rel='noopener noreferrer'>
            <img src={item.image} alt='' className='img-fluid allitem-item-img' />
          </a>
        </div>
        <div className='item-info' id={item.itemId + "_title"} target='_blank' rel='noopener noreferrer'>
          <a
            href='#'
            data-tooltip-id={item.id + "_title"}
            data-tooltip-content={item.title}
            onClick={(e) => {
              e.preventDefault();
              onLinkClick(item);
            }}>
            {truncateText(item.title, 35)}
          </a>
          <Tooltip id={item.id + "_title"} />
        </div>
        <div className='item-info '>{item.price}</div>
        <div className='item-info '>{item.shipping}</div>
        <div className='item-info '>
          <button
            type='button'
            className='btn btn-secondary'
            style={{ backgroundColor: "white" }}
            onClick={() => onIconClick(item)}>
            {renderWishlistIcon()}
          </button>
        </div>
      </div>
    );
  }
};

export default WishListItem;
