import { fetchSimilarItems } from "../services/EbaySearchApi";

import React, { useEffect, useState } from "react";

import "./SimilarProduct.css";
import SimilarProductItem from "./SimilarProductItem";

const SimilarProduct = (props) => {
  const [similarProductState, setSimilarProductState] = useState({
    similarProducts: [],
    sortBy: "default",
    sortOrder: "ascending",
  });

  const handleSortChange = (event) => {
    console.log("sort by changed to " + event.target.value);
    setSimilarProductState((prevState) => {
      return {
        ...prevState,
        sortBy: event.target.value,
      };
    });
  }


  const renderSortByDropDown = () => {
    return (
      <select class="form-select" aria-label="sort-by" onChange={handleSortChange}>
        <option selected value="default">Default</option>
        <option value="productName">Product Name</option>
        <option value="daysLeft">Days Left</option>
        <option value="price">Price</option>
        <option value="shippingCost">Shipping Cost</option>
      </select>
    );
  };

  const handleOrderChange=(event)=>{
    console.log("order by changed to " + event.target.value);
    setSimilarProductState((prevState) => {
      return {
        ...prevState,
        sortOrder: event.target.value,
      };
    });
  }

  const renderOrderByDropDown = () => {
    return (
      <select class="form-select" aria-label="sort-order" onChange={handleOrderChange}>
        <option value="ascending" selected>
          Ascending
        </option>
        <option value="descending">Descending</option>
      </select>
    );
  };

  const renderSimilarItems = () => {
    if (similarProductState.similarProducts.length > 0) {
      return similarProductState.similarProducts.map((item) => {
        return <SimilarProductItem item={item} />;
      });
    }
  };

  const parseFieldsType=(details)=>{
    return details.map((item)=>{
      return{
        ...item,
        price: parseFloat(item.price),
        shippingCost: parseFloat(item.shippingCost),
        daysLeft: parseInt(item.daysLeft),
      }
    });
  }

  if (
    props.productState.isSimilarProducts &&
    similarProductState.similarProducts.length == 0
  ) {
    console.log("fetching similar products");
    fetchSimilarItems(props.item.itemId).then((details) => {
      console.log(
        "Received similar product detail for item " + props.item.itemId
      );
      console.dir(details);
      const parsedDetails=parseFieldsType(details)
      setSimilarProductState((prevState) => {
        return {
          ...prevState,
          similarProducts: parsedDetails,
        };
      });
    });
  }
  if (
    props.productState.isSimilarProducts &&
    similarProductState.similarProducts?.length > 0
  ) {
    console.log("rendering similar products");

    return (
      <div>
        {renderSortByDropDown()}
        {renderOrderByDropDown()}
        {renderSimilarItems()}
      </div>
    );
  }
};

export default SimilarProduct;
