import { render } from '@testing-library/react'
import './SellerDetail.css'


import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const SellerDetail = (props) => {
    const renderSellerName = () => {
        if(props.item.sellerDetails.storeName){
            return (
                <div class="row align-items-center justify-content-center">
                    <div class="col text-center sellerName" style={{color:'white'}}>{props.item.sellerDetails.storeName}</div>
                </div>
            )
        }
    }
    const renderFeedbackScore = () => {
        if (props.item.sellerDetails.feedBackScore) {
          return (
            <div class="row shippingDetailsRow">
              <div class="col shippingFieldName">Feedback Score</div>
              <div class="col">{props.item.sellerDetails.feedBackScore}</div>
            </div>
          );
        }
      }

      const renderPopularity = () => {
        if (props.item.sellerDetails.popularity) {
            const popularity=parseFloat(props.item.sellerDetails.popularity);
          return (
            <div class="row shippingDetailsRow">
              <div class="col shippingFieldName">Popularity</div>
              {/* <div class="col">{props.item.sellerDetails.popularity}</div> */}
              <div class="col"><div style={{width:'3rem', height:'3rem'}}>
                  <CircularProgressbar value={popularity} text={`${popularity}`} styles={buildStyles({pathColor:'green',textColor:'white'})} />
              </div></div>
            </div>
          );
        }
      }
      const renderFeedbackRatingStar = () => {
        if (props.item.sellerDetails.feedbackRatingStar) {
          return (
            <div class="row shippingDetailsRow">
              <div class="col shippingFieldName">Feedback Rating Star</div>
              <div class="col">{props.item.sellerDetails.feedbackRatingStar}</div>
            </div>
          );
        }
      }
      const renderTopRated = () => {
        if (props.item.sellerDetails.topRated) {
          return (
            <div class="row shippingDetailsRow">
              <div class="col shippingFieldName">Top Rated</div>
              <div class="col">{props.item.sellerDetails.topRated === "true" ? (
              <CheckIcon style={{ color: "green" }} />
            ) : (
              <CloseIcon style={{ color: "red" }} />
            )}</div>
            </div>
          );
        }
      }
      const renderStoreName = () => {
        if (props.item.sellerDetails.storeName) {
          return (
            <div class="row shippingDetailsRow">
              <div class="col shippingFieldName">Store Name</div>
              <div class="col">{props.item.sellerDetails.storeName}</div>
            </div>
          );
        }
      }
      const renderBuyProductAt = () => {
        if (props.item.sellerDetails.buyProductAt) {
          return (
            <div class="row shippingDetailsRow">
              <div class="col shippingFieldName">Buy Product At</div>
              <div class="col"><a href={props.item.sellerDetails.buyProductAt}>Store</a></div>
            </div>
          );
        }
      }

    if (
        props.productState.isSellerPage &&
        props.item &&
        props.item.sellerDetails
      ) {
        console.log("rendering shipping details");
        console.dir(props.item);
        return(
            <div
        key={props.item.itemId + "_itemSellerDetails"}
        class="container item-seller-details-container"
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

}

export default SellerDetail;