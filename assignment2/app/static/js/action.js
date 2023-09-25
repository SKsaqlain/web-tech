function uniqueID() {
    return Math.floor(Math.random() * Date.now())
    }

function fetchResults() {
  storeToLocalStorage();
  validateForm();

  
  console.log("Fetching All Results");
  let trackingId=uniqueID().toString();
  let data = document.forms["search-form"];
  const xhr = new XMLHttpRequest();
  const fd = new FormData(data);

  xhr.addEventListener("load", (event) => {
    console.log("Response Received for findAllItems request: trackingId :"+trackingId);
    createCards(JSON.parse(xhr.responseText));
  });
  xhr.addEventListener("error", (event) => {
    console.error("Something went wrong while making findAllItems request: trackingId"+trackingId+", error: "+xhr.responseText);
  });

  xhr.open(
    "GET",
    "http://0.0.0.0:5050/findAllItems?" + new URLSearchParams(fd).toString()+"&"+"trackingId="+trackingId,
    true
  );
  xhr.send();
  return true;
}
