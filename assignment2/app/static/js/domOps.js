let N_DISPLAY_CARDS = 10;
function createCards(rsp) {
  console.log("Creating Cards ");
  parent = document.getElementById("card-container");
  resultCard = createResultCards(parent, rsp.data);
  createItemCards(parent, rsp.data["items"]);
}

function createResultCards(parent, data) {
  console.log("Creating Result Cards with data:" + data["totalResultsFound"]);
  let reqForm = document.forms["search-form"];
  let totalResultsFound = data["totalResultsFound"];
  resultsCard = document.createElement("div");
  resultsCard.setAttribute("class", "total-results-card");
  resultsCard.innerHTML =
    parseInt(totalResultsFound) +
    " Results found for " +
    reqForm["Key words"].value;
  parent.appendChild(resultsCard);
  return resultsCard;
}

function createItemCards(parent, data) {
  console.log("Creating Item Cards with data:" + data);
  let n = Math.min(N_DISPLAY_CARDS, data.length);
  for (let i = 0; i < n; i++) {
    createTable(parent, data[i]);
  }
}

function createTable(parent, data) {
  var table = document.createElement("table");
  table.setAttribute("class", "item-card-table");
  table.setAttribute("id", "item-card-table-" + data["itemId"]);
  table.setAttribute("border", "1");
  var row1 = table.insertRow(0);
  var cell1_1 = row1.insertCell(0);
  cell1_1.setAttribute("rowspan", "4"); // Set rowspan for the first cell
  cell1_1.textContent = "First Column (Spans 4 Rows)";

  //adding image
  var img = createImageSection(data);
  cell1_1.appendChild(img);

  // add item tiele
  var cell1_2 = row1.insertCell(1);
  cell1_2.textContent = data["itemTitle"];
  cell1_2.setAttribute("class", "item-title");

  // add Category and redirect logo
  var row2 = table.insertRow(1);
  var cell2_2 = row2.insertCell(0);
  cell2_2.textContent = "Category: " + data["itemCategoryTag"];
  cell2_2.setAttribute("class", "item-category");
  var redirectLogo=createRedirectLogo(data);
  cell2_2.appendChild(redirectLogo);

  //add Condition and top rated logo
  var row3 = table.insertRow(2);
  var cell3_2 = row3.insertCell(0);
  cell3_2.textContent = "Condition: " + data["condition"];
  cell3_2.setAttribute("class", "item-condition");
  if(data["isTopRated"]==='true'){
    var topRatedLogo=createTopRatedLogo(data);
    cell3_2.appendChild(topRatedLogo);
  }
  //add price
  var row4 = table.insertRow(3);
  var cell4_2 = row4.insertCell(0);
  cell4_2.textContent = "Price: "+data["itemPrice"];
  cell4_2.setAttribute("class", "item-price");

  // Add content to the second cell in each row
//   cell2.textContent = "Second Column " + (i + 1);
  parent.appendChild(table);
}

function createImageSection(data) {
  var img = document.createElement("img");
  if (data["itemImageUrl"] != "") {
    img.setAttribute("src", data["itemImageUrl"]);
  } else {
    img.setAttribute("src", "https://thumbs1.ebaystatic.com/ pict/04040_0.jpg");
  }
  img.setAttribute("class", "item-card-image");
  return img;
}

function createRedirectLogo(data) {
    var redirectLogo = document.createElement("img");
    redirectLogo.setAttribute("src", "/static/images/redirect.png");
    redirectLogo.setAttribute("class", "item-redirect-logo");
    return redirectLogo;
    }

function createTopRatedLogo(data){
    var topRatedLogo = document.createElement("img");
    topRatedLogo.setAttribute("src", "/static/images/topRatedImage.png");
    topRatedLogo.setAttribute("class", "item-top-rated-logo");
    return topRatedLogo;
}