import { render } from "@testing-library/react";
import { fetchGoogleImages } from "../services/GoogleImgService";

import "./GoogleImages.css";

const GoogleImgaes = (props) => {
  const renderImage = (link) => {
    if (link) {
      return (
        <img
          src={link}
          class="w-100 shadow-1-strong mb-2 google-img"
          alt="Boat on Calm Water"
        />
      );
    }
  };

  const checkIfImageAvailable = props.productState.googleImageList.length > 0;
  if (
    props.productState.isPhotosPage &&
    props.productState.googleImageList.length == 0
  ) {
    fetchGoogleImages(props.item.title).then((data) => {
      if (data && data.items && data.items.length > 0) {
        console.log("setting googleImageList prop in productState");
        const imagesLink = data.items.map((item) => {
          return item.link;
        });
        props.setProductState((prevState) => {
          return {
            ...prevState,
            googleImageList: imagesLink,
          };
        });
      }
    });
  } else if (
    props.productState.isPhotosPage &&
    props.productState.googleImageList.length > 0
  ) {
    console.log("renderGoogleImgaes");
    return (
      <div class="row ">
        <div class="col-lg-4 col-md-12 mb-4 mb-lg-0 google-image-column">
          {renderImage(props.productState.googleImageList[0])}
          {renderImage(props.productState.googleImageList[1])}
        </div>

        <div class="col-lg-4 mb-4 mb-lg-0 google-image-column">
          {renderImage(props.productState.googleImageList[2])}
          {renderImage(props.productState.googleImageList[3])}
          {renderImage(props.productState.googleImageList[4])}
        </div>

        <div class="col-lg-4 mb-4 mb-lg-0 google-image-column">
          {renderImage(props.productState.googleImageList[5])}
          {renderImage(props.productState.googleImageList[6])}
          {renderImage(props.productState.googleImageList[7])}
        </div>
      </div>
    );
  }
};

export default GoogleImgaes;
