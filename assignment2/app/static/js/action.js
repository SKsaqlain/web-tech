function uniqueID() {
    return Math.floor(Math.random() * Date.now())
    }

function fetchResults() {
  storeToLocalStorage();
  validateForm();

  alert("Fetching Results");
  console.log("Fetching All Results");
  let data = document.forms["search-form"];
  const xhr = new XMLHttpRequest();
  const fd = new FormData(data);

  xhr.addEventListener("load", (event) => {
    alert("Data Sent and response laoded");
  });
  xhr.addEventListener("error", (event) => {
    alert("Something went wrong");
  });

  xhr.open(
    "GET",
    "http://0.0.0.0:5050/findAllItems?" + new URLSearchParams(fd).toString()+"&"+"trackingId="+uniqueID().toString(),
    true
  );
  xhr.send();
  return true;
}
