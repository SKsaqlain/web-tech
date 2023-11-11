import { render } from "@testing-library/react";
import "./SellerDetail.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import StarsIcon from "@mui/icons-material/Stars";

const SellerDetail = (props) => {
  const colorRGBValues = {
    None: "rgb(0, 0, 0)", // Black
    Yellow: "rgb(255, 255, 0)",
    Blue: "rgb(0, 0, 255)",
    Turquoise: "rgb(64, 224, 208)",
    Purple: "rgb(128, 0, 128)",
    Red: "rgb(255, 0, 0)",
    Green: "rgb(0, 128, 0)",
    YellowShooting: "rgb(255, 215, 0)",
    TurquoiseShooting: "rgb(0, 191, 255)",
    PurpleShooting: "rgb(160, 32, 240)",
    RedShooting: "rgb(220, 20, 60)",
    GreenShooting: "rgb(0, 128, 0)",
    SilverShooting: "rgb(192, 192, 192)", // Silver
  };


  const renderSellerName = () => {
    if (props.item.sellerDetails.storeName) {
      return (
        <div class="row  ">
          <div className="col text-center d-flex justify-content-center align-items-center sellerName" >
    {props.item.sellerDetails.storeName}
  </div>
        </div>
      );
    }
  };
  const renderFeedbackScore = () => {
    if (props.item.sellerDetails.feedBackScore) {
      return (
        <div class="row sellerDetailsRow">
          <div class="col shippingFieldName">Feedback Score</div>
          <div class="col">{props.item.sellerDetails.feedBackScore}</div>
        </div>
      );
    }
  };

  const renderPopularity = () => {
    if (props.item.sellerDetails.popularity) {
      const popularity = parseFloat(props.item.sellerDetails.popularity);
      return (
        <div class="row sellerDetailsRow">
          <div class="col shippingFieldName">Popularity</div>
          <div class="col">
            <div style={{ width: "3rem", height: "3rem" }}>
              <CircularProgressbar
                value={popularity}
                text={`${popularity}`}
                styles={buildStyles({ pathColor: "green", textColor: "white" })}
              />
            </div>
          </div>
        </div>
      );
    }
  };
  
  const renderFeedbackRatingStar = () => {
    if (props.item.sellerDetails.feedbackRatingStar) {
      return (
        <div class="row sellerDetailsRow">
          <div class="col shippingFieldName">Feedback Rating Star</div>
          <div class="col">
            <StarsIcon
              style={{
                color: `${
                    props.item.sellerDetails.feedbackRatingStar!='None'?colorRGBValues[`${props.item.sellerDetails.feedbackRatingStar}`]:colorRGBValues['None']
                }`,
                width: "3rem", height: "3rem"
              }}
            />
          </div>
        </div>
      );
    }
  };
  const renderTopRated = () => {
    if (props.item.sellerDetails.topRated) {
      return (
        <div class="row sellerDetailsRow">
          <div class="col shippingFieldName">Top Rated</div>
          <div class="col">
            {props.item.sellerDetails.topRated === "true" ? (
              <CheckIcon style={{ color: "green" ,width: "3rem", height: "3rem" }} />
            ) : (
              <CloseIcon style={{ color: "red" ,width: "3rem", height: "3rem" }} />
            )}
          </div>
        </div>
      );
    }
  };
  const renderStoreName = () => {
    if (props.item.sellerDetails.storeName) {
      return (
        <div class="row sellerDetailsRow">
          <div class="col shippingFieldName">Store Name</div>
          <div class="col">{props.item.sellerDetails.storeName}</div>
        </div>
      );
    }
  };

  const openStoreInNewTab=(link)=>{
    if(link){
        window.open(link, "_blank");
        }
  }

  const renderBuyProductAt = () => {
    if (props.item.sellerDetails.buyProductAt) {
      return (
        <div class="row sellerDetailsRow">
          <div class="col shippingFieldName">Buy Product At</div>
          <div class="col">
          <button type="button" class="btn buy-product-at-store-btn" onClick={()=>openStoreInNewTab(props.item.sellerDetails.buyProductAt)}>Store</button>
          </div>
        </div>
      );
    }
  };

  if (
    props.productState.isSellerPage &&
    props.item &&
    props.item.sellerDetails
  ) {
    console.log("rendering shipping details");
    console.dir(props.item);
    return (
      <div
        key={props.item.itemId + "_itemSellerDetails"}
        class="item-seller-details-container"
      >
        {renderSellerName()}
        {renderFeedbackScore()}
        {renderPopularity()}
        {renderFeedbackRatingStar()}
        {renderTopRated()}
        {renderStoreName()}
        {renderBuyProductAt()}
      </div>
    );
  }
};

export default SellerDetail;
