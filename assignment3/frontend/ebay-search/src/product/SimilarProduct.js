import { fetchSimilarItems } from "../services/EbaySearchApi";

import React, { useEffect, useState } from "react";

import "./SimilarProduct.css";
import SimilarProductItem from "./SimilarProductItem";

const SimilarProduct = (props) => {
  const [similarProductState, setSimilarProductState] = useState({});

  const renderSimilarItems = () => {
    if (similarProductState.similarProducts) {
      return similarProductState.similarProducts.map((item) => {
        return <SimilarProductItem item={item} />;
      });
    }
  };

  if (
    props.productState.isSimilarProducts &&
    !similarProductState.similarProducts
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
        {renderSimilarItems()}
      </div>
    );
  }
};

export default SimilarProduct;
