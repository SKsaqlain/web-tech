import { fetchSimilarItems } from "../services/EbaySearchApi";

import React, { useEffect, useState } from "react";

import "./SimilarProduct.css";
import SimilarProductItem from "./SimilarProductItem";

const SimilarProduct = (props) => {
  const [similarProductState, setSimilarProductState] = useState({
    similarProducts: [],
    sortBy: "Default",
    sortOrder: "ascending",
  });

  const renderSortByDropDown = () => {
    return (
      <select class="form-select" aria-label="sort-by">
        <option selected>Default</option>
        <option value="1">Product Name</option>
        <option value="2">Days Left</option>
        <option value="3">Price</option>
        <option value="3">Shipping Cost</option>
      </select>
    );
  };

  const renderOrderByDropDown = () => {
    return (
      <select class="form-select" aria-label="sort-order">
        <option value="Ascending" selected>
          Ascending
        </option>
        <option value="Descending">Descending</option>
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
      setSimilarProductState((prevState) => {
        return {
          ...prevState,
          similarProducts: details,
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
