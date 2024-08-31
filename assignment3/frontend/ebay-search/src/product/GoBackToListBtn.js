const GoBackToListBtn = (props) => {
  return (
    <button
    
      class="btn btn-light go-back-btn-container"
      style={{alignSelf: 'flex-end'}}
      onClick={(e) => {
        e.preventDefault();
        props.setProductState((prevState) => {
          return {
            ...prevState,
            isDetailPage: false,
            isPhotosPage: false,
            isShippingPage: false,
            isSellerPage: false,
            isSimilarProducts: false,
            googleImageList: [],
          };
        });
        props.onGoBackToBtnClick();
      }}
    >
      {"<"} List
    </button>
  );
};

export default GoBackToListBtn;
