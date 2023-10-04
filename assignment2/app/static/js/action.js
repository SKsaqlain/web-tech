const BACKEND_URL = "https://sms--dep-01.uw.r.appspot.com";
// const BACKEND_URL="http://localhost:8080";

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

function fetchAllItemDetails() {
  if (validateForm() == false) return false;

  let trackingId = uniqueID().toString();
  let data = document.forms["search-form"];
  const xhr = new XMLHttpRequest();
  const fd = new FormData(data);
  console.log(
    "Fetching All Results for keywords " +
      data["Key words"].value +
      " with trackingId: " +
      trackingId
  );

  xhr.addEventListener("load", (event) => {
    console.log(
      "Response Received for findAllItems request: trackingId :" + trackingId
    );
    createCards(JSON.parse(xhr.responseText));
  });
  xhr.addEventListener("error", (event) => {
    console.error(
      "Something went wrong while making findAllItems request: trackingId" +
        trackingId +
        ", error: " +
        xhr.responseText
    );
  });

  xhr.open(
    "GET",
    BACKEND_URL +
      "/findAllItems?" +
      new URLSearchParams(fd).toString() +
      "&" +
      "trackingId=" +
      trackingId,
    true
  );
  xhr.send();
  return true;
}

function fetchItemDetails(itemId) {
  console.log("Fetching Item Details for itemId: " + itemId);
  let trackingId = uniqueID().toString();
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", (event) => {
    console.log(
      "Response Received for findItem request: trackingId :" + trackingId
    );
    createItemDetailsCard(JSON.parse(xhr.responseText));
  });
  xhr.addEventListener("error", (event) => {
    console.error(
      "Something went wrong while making findItem request: trackingId" +
        trackingId +
        ", error: " +
        xhr.responseText
    );
  });
  xhr.open(
    "GET",
    BACKEND_URL +
      "/findItem?itemId=" +
      itemId +
      "&" +
      "trackingId=" +
      trackingId,
    true
  );
  xhr.send();
  return true;
}
