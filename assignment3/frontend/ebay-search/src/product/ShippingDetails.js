import "./ShippingDetails.css";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const ShippingDetails = (props) => {
  const renderShippingCost = () => {
    if (props.item.shippingDetails.shippingCost) {
      return (
        <div class="row shippingDetailsRow">
          <div class="col shippingFieldName">Shipping Cost</div>
          <div class="col">{props.item.shippingDetails.shippingCost}</div>
        </div>
      );
    }
  };

  const renderShippingLocation = () => {
    if (props.item.shippingDetails.shippingLocation) {
      return (
        <div class="row shippingDetailsRow">
          <div class="col shippingFieldName">Shipping Locations</div>
          <div class="col">{props.item.shippingDetails.shippingLocation}</div>
        </div>
      );
    }
  };

  const renderHandlingTime = () => {
    if (props.item.shippingDetails.handlingTime) {
      const days =
        parseInt(props.item.shippingDetails.handlingTime) > 1
          ? " Days"
          : " Day";
      return (
        <div class="row shippingDetailsRow">
          <div class="col shippingFieldName">Handling Time</div>
          <div class="col">
            {props.item.shippingDetails.handlingTime + days}
          </div>
        </div>
      );
    }
  };

  const renderExpeditedShipping = () => {
    if (props.item.shippingDetails.expeditedShipping) {
      return (
        <div class="row shippingDetailsRow">
          <div class="col shippingFieldName">Expedited Shipping</div>
          <div class="col">
            {props.item.shippingDetails.expeditedShipping === "true" ? (
              <CheckIcon style={{ color: "green" }} />
            ) : (
              <CloseIcon style={{ color: "red" }} />
            )}
          </div>
        </div>
      );
    }
  };
  const renderOneDayShipping = () => {
    if (props.item.shippingDetails.oneDayShipping) {
      return (
        <div class="row shippingDetailsRow">
          <div class="col shippingFieldName">One Day Shipping</div>
          <div class="col">
            {props.item.shippingDetails.oneDayShipping === "true" ? (
              <CheckIcon style={{ color: "green" }} />
            ) : (
              <CloseIcon style={{ color: "red" }} />
            )}
          </div>
        </div>
      );
    }
  };
  const renderReturnAccepted = () => {
    if (props.item.shippingDetails.returnsAccepted) {
      return (
        <div class="row shippingDetailsRow">
          <div class="col shippingFieldName">Return Accepted</div>
          <div class="col">
            {props.item.shippingDetails.returnsAccepted === "true" ? (
              <CheckIcon style={{ color: "green" }} />
            ) : (
              <CloseIcon style={{ color: "red" }} />
            )}
          </div>
        </div>
      );
    }
  };

  if (
    props.productState.isShippingPage &&
    props.item &&
    props.item.shippingDetails
  ) {
    console.log("rendering shipping details");
    console.dir(props.item);
    return (
      <div
        key={props.item.itemId + "_itemShippingDetails"}
        class="container item-shipping-details-container"
      >
        {renderShippingCost()}
        {renderShippingLocation()}
        {renderHandlingTime()}
        {renderExpeditedShipping()}
        {renderOneDayShipping()}
        {renderReturnAccepted()}
      </div>
    );
  }
};

export default ShippingDetails;
