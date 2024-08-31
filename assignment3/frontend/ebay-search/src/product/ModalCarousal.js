import { useState } from "react";
import "./ModalWithSlides.css";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ModalCarousal = (props) => {
  console.log("Rendering ModalWithSlides");
  const { isOpen, onClose, productImages } = props;
  const [count, setCount] = useState(1);
  if (!productImages || productImages.length === 0) {
    return null;
  }
  let len = productImages?.length - 1;
  console.log("Rendering product images", count);
  console.dir(productImages);
  function leftArrow() {
    if (count === 0) {
      setCount(len);
    } else {
      setCount(count - 1);
    }
  }
  function rightArrow() {
    if (count === len) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  return (
    <div className={`modal ${isOpen ? "show" : ""}`} style={{ display: isOpen ? "block" : "none" }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <p className='modal-title'>Product Images</p>
            <button type='button' className='close' onClick={onClose}>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>

          <Carousel showStatus={false} showThumbs={false} showIndicators={false} showArrows={true}> 
            {productImages.map((productImage, index) => {
              return (
                <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                  <img
                    src={productImage}
                    alt='Product Images'
                    style={{ width: "80%", margin: "auto", height: "25rem", border: "solid black 10px", borderRadius: "10px" }}
                  />
                </div>
              );
            })}
          </Carousel>

          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCarousal;
