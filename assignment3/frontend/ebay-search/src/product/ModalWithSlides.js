// import "./ModalWithSlides.css";
// import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

// const ModalWithSlides = (props) => {
//   console.log("Rendering ModalWithSlides");
//   const { isOpen, onClose, productImages } = props;
//   if (!productImages || productImages.length == 0) {
//     return null;
//   }
//   console.log("Rendering product images");
//   console.dir(productImages);

//   return (
//     <div className={`modal ${isOpen ? "show" : ""}`} style={{ display: isOpen ? "block" : "none" }}>
//       <div className='modal-dialog'>
//         <div className='modal-content'>
//           <div className='modal-header'>
//             <p className='modal-title'>Product Images</p>
//             <button type='button' className='close' onClick={onClose}>
//               <span aria-hidden='true'>&times;</span>
//             </button>
//           </div>

//           <MDBCarousel showControls pause={true} data-bs-interval={false}>
//           {productImages.map((productImage, index) => {
//             console.log("Rendering product image " + index);
//               return (
//                 <MDBCarouselItem
//                   className='d-block '
//                   src={productImage} alt='Product Images'
//                   itemId={index+1}
//                 /> 
//               );
//             })}
//           </MDBCarousel>

//           <div className='modal-footer'>
//             <button type='button' className='btn btn-secondary' onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalWithSlides;
