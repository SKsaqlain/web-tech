import { fetchSimilarItems } from "../services/EbaySearchApi";

import React, { useEffect, useState } from "react";

import "./SimilarProduct.css";
import SimilarProductItem from "./SimilarProductItem";
import { render } from "@testing-library/react";
import NoRecords from "../norecords/NoRecords";

const SimilarProduct = (props) => {
  const [similarProductState, setSimilarProductState] = useState({
    similarProducts: [],
    sortBy: "default",
    sortOrder: "ascending",
    isShowLess: true,
    isShowMore: false,
    isShowMoreBtn: true,
    isShowLessBtn: false,
  });

  const handleSortChange = (event) => {
    console.log("sort by changed to " + event.target.value);
    setSimilarProductState((prevState) => {
      return {
        ...prevState,
        sortBy: event.target.value,
      };
    });
  };

  const renderSortByDropDown = () => {
    return (
      <select class='form-select sort-btn' aria-label='sort-by' onChange={handleSortChange}>
        <option selected value='default'>
          Default
        </option>
        <option value='productName'>Product Name</option>
        <option value='daysLeft'>Days Left</option>
        <option value='price'>Price</option>
        <option value='shippingCost'>Shipping Cost</option>
      </select>
    );
  };

  const handleOrderChange = (event) => {
    console.log("order by changed to " + event.target.value);
    setSimilarProductState((prevState) => {
      return {
        ...prevState,
        sortOrder: event.target.value,
      };
    });
  };

  const renderOrderByDropDown = () => {
    return (
      <select class='form-select sort-btn' aria-label='sort-order' onChange={handleOrderChange}>
        <option value='ascending' selected>
          Ascending
        </option>
        <option value='descending'>Descending</option>
      </select>
    );
  };

  const sortItemsBasedOnFilter = () => {
    console.log("sorting items based on filter");
    let sortedItems = [...similarProductState.similarProducts];
    if (similarProductState.sortBy == "default") {
      return sortedItems;
    } else {
      sortedItems.sort((a, b) => {
        if (a[similarProductState.sortBy] < b[similarProductState.sortBy]) {
          return -1;
        }
        if (a[similarProductState.sortBy] > b[similarProductState.sortBy]) {
          return 1;
        }
        return 0;
      });
    }
    if (similarProductState.sortOrder == "descending") {
      sortedItems.reverse();
    }
    return sortedItems;
  };

  const renderSimilarItems = () => {
    if (similarProductState.similarProducts.length > 0) {
      const sortedItems = sortItemsBasedOnFilter();
      if (similarProductState.isShowLess) {
        return sortedItems.slice(0, 5).map((item) => {
          return <SimilarProductItem item={item} />;
        });
      }
      if (similarProductState.isShowMore) {
        return sortedItems.map((item) => {
          return <SimilarProductItem item={item} />;
        });
      }
    }
  };

  const renderShowMoreBtn = () => {
    if (similarProductState.isShowMoreBtn && similarProductState.similarProducts.length > 5) {
      return (
        <button
          type='button'
          className='btn showMoreLessBtn'
          onClick={() =>
            setSimilarProductState((prevState) => {
              return { ...prevState, isShowLess: false, isShowMore: true, isShowMoreBtn: false, isShowLessBtn: true };
            })
          }>
          Show More
        </button>
      );
    }
  };
  const renderShowLessBtn = () => {
    if (similarProductState.isShowLessBtn && similarProductState.similarProducts.length > 5) {
      return (
        <button
          type='button'
          className='btn showMoreLessBtn'
          onClick={() =>
            setSimilarProductState((prevState) => {
              return { ...prevState, isShowLess: true, isShowMore: false, isShowMoreBtn: true, isShowLessBtn: false };
            })
          }>
          Show Less
        </button>
      );
    }
  };

  const parseFieldsType = (details) => {
    return details.map((item) => {
      return {
        ...item,
        price: parseFloat(item.price),
        shippingCost: parseFloat(item.shippingCost),
        daysLeft: parseInt(item.daysLeft),
      };
    });
  };

  if (props.productState.isSimilarProducts && similarProductState.similarProducts.length == 0) {
    console.log("fetching similar products");
    fetchSimilarItems(props.item.itemId).then((details) => {
      console.log("Received similar product detail for item " + props.item.itemId);
      const parsedDetails = parseFieldsType(details);
      console.dir(parsedDetails);
      setSimilarProductState((prevState) => {
        return {
          ...prevState,
          similarProducts: parsedDetails,
        };
      });
    });
  }
  if (props.productState.isSimilarProducts && similarProductState.similarProducts?.length > 0) {
    console.log("rendering similar products");

    return (
      <div>
        <div className='row justify-content-left sort-btn-container'>
          <div className='col'>{renderSortByDropDown()}</div>
          <div className='col'>{renderOrderByDropDown()}</div>
        </div>
        {renderSimilarItems()}
        <div className='container'>
          <div className='row justify-content-center'>
            {renderShowMoreBtn()}
            {renderShowLessBtn()}
          </div>
        </div>
      </div>
    );
  }
};

export default SimilarProduct;
