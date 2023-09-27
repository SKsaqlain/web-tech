let N_DISPLAY_CARDS = 10;
//variable to store all cards and their state
let TABLE_CARDS_HOLDER = [];


function deleteCards(){
  let parent = document.getElementById("card-container");
  // remove childrens
  console.log("Removing all old search from card-container");
  parent.innerHTML="";
}
function createCards(rsp) {
  if(rsp.data=="" || rsp.data==NaN){
    console.log("No results found for this search");
    let parent = document.getElementById("card-container");
    createNoResultsFoundCard(parent);  
    return;
  }
  console.log("Creating Cards ");
  let parent = document.getElementById("card-container");
  // remove childrens
  console.log("Removing all old search from card-container");
  parent.innerHTML="";

  createResultCards(parent, rsp.data);
  createItemCards(parent, rsp.data["items"]);
  if (TABLE_CARDS_HOLDER.length > 3) {
    console.log("More than 3 items, Creating Show More Button");
    createShowMoreBtn(parent);
  }
}
function createNoResultsFoundCard(parent){
  let noResultsFoundCard=document.createElement("h1");
  noResultsFoundCard.setAttribute("class","no-results-found-card");
  noResultsFoundCard.innerHTML="No Results Found";
  parent.appendChild(noResultsFoundCard);
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
  console.log("Creating Items Cards ");
  let n = Math.min(N_DISPLAY_CARDS, data.length);
  TABLE_CARDS_HOLDER=[];
  for (let i = 0; i < n; i++) {
    let table = createTable(parent, data[i]);
    if (i >= 3) {
      table.style.display = "none";
    }
    TABLE_CARDS_HOLDER.push(table);
  }
}

function createShowMoreBtn(parent) {
  console.log("Creating Show More Button");
  let showMoreBtn = document.createElement("button");
  showMoreBtn.setAttribute("class", "show-more-btn");
  showMoreBtn.setAttribute("id", "show-more-btn");
  showMoreBtn.innerHTML = "Show More";
  showMoreBtn.addEventListener("click", showMore);
  parent.appendChild(showMoreBtn);
}

function showMore() {
  if (TABLE_CARDS_HOLDER.length <= 3) {
    return;
  }
  console.log("Show More Button Clicked, adding remaining cards");
  for (let i = 3; i < TABLE_CARDS_HOLDER.length; i++) {
    TABLE_CARDS_HOLDER[i].style.display = "table";
  }
  let showMoreBtn = document.getElementById("show-more-btn");
  showMoreBtn.style.display = "none";
  let showLessBtn = document.createElement("button");
  showLessBtn.setAttribute("class", "show-less-btn");
  showLessBtn.setAttribute("id", "show-less-btn");
  showLessBtn.innerHTML = "Show Less";
  showLessBtn.addEventListener("click", showLess);
  let parent = document.getElementById("card-container");
  parent.appendChild(showLessBtn);
  console.log("Scrolling to bottom");
  // document.documentElement.scrollTop = document.documentElement.scrollHeight;
  scrollToBottom();
}

function scrollToBottom() {
  let currentPosition = window.scrollY; // Get the current scroll position
  let targetPosition =
    document.documentElement.scrollHeight - window.innerHeight; // Calculate the target scroll position (bottom of the page)
  let increment = 10; // Set the scroll increment (adjust as needed)

  // Define the scroll function
  function scroll() {
    if (currentPosition < targetPosition) {
      currentPosition += increment;
      if (currentPosition > targetPosition) {
        currentPosition = targetPosition;
      }
      window.scrollTo(0, currentPosition); // Scroll to the updated position
      window.requestAnimationFrame(scroll); // Request the next frame
    }
  }

  // Start the scroll animation
  scroll();
}

function showLess() {
  if (TABLE_CARDS_HOLDER.length <= 3) {
    console.log("No need to show less");
    return;
  }
  console.log("Show Less Button Clicked, removing remaining cards");
  for (let i = 3; i < TABLE_CARDS_HOLDER.length; i++) {
    TABLE_CARDS_HOLDER[i].style.display = "none";
  }
  let showMoreBtn = document.getElementById("show-more-btn");
  showMoreBtn.style.display = "block";
  let showLessBtn = document.getElementById("show-less-btn");
  showLessBtn.style.display = "none";
  console.log("Scrolling to top");
  // document.documentElement.scrollTop = 0;
  scrollToTop();
}

function scrollToTop() {
  let currentPosition = window.scrollY; // Get the current scroll position
  let targetPosition = 0; // Scroll to the top of the page
  let increment = 10; // Set the scroll increment (adjust as needed)

  // Define the scroll function
  function scroll() {
    if (currentPosition > targetPosition) {
      currentPosition -= increment;
      if (currentPosition < targetPosition) {
        currentPosition = targetPosition;
      }
      window.scrollTo(0, currentPosition); // Scroll to the updated position
      window.requestAnimationFrame(scroll); // Request the next frame
    }
  }

  // Start the scroll animation
  scroll();
}

function createTable(parent, data) {
  // let table = document.createElement("table");
  // table.setAttribute("class", "item-card-table");
  // table.setAttribute("id", data["itemId"]);
  // table.setAttribute("border", "1");
  // table.addEventListener("click", searchAndLoadItemDetails);

  //parent div
  let flyingCardContainer = document.createElement("div");
  flyingCardContainer.setAttribute("class", "flying-card-container");
  flyingCardContainer.setAttribute("id", data["itemId"]);
  flyingCardContainer.addEventListener("click", searchAndLoadItemDetails);

  //image div starts
  let flyingImageContainer = document.createElement("div");
  flyingImageContainer.setAttribute("class", "flying-image-container");

  if (data["itemImageUrl"] == "") {
    data["itemImageUrl"] = "https://thumbs1.ebaystatic.com/ pict/04040_0.jpg";
  }
  let img = document.createElement("img");
  img.setAttribute("src", data["itemImageUrl"]);
  img.setAttribute("class", "flying-image");
  flyingImageContainer.appendChild(img);
  flyingCardContainer.appendChild(flyingImageContainer);
  //image div ends

  //table div starts
  let flyingTableContainer = document.createElement("div");
  flyingTableContainer.setAttribute("class", "flying-table-container");
  // let flyingTable = document.createElement("table");

  let titleCode = `<tr>
  <td class="flying-table-container-td" ><div class="title">${data["itemTitle"]}</div></td>
</tr>`;
  let categoryCode = `<tr>
<td class="flying-table-container-td">Category: <i>${data["itemCategoryTag"]}</i>
<img src="/static/images/redirect.png" class="item-redirect-logo"/>
</td>
</tr>`;

  let condition = `Condition: ${data["condition"]}`;
  let topRated = "";
  if (data["isTopRated"] === "true") {
    topRated = `<img src="/static/images/topRatedImage.png" class="item-top-rated-logo"/>`;
  }
  let conditionCode = `<tr>
<td class="flying-table-container-td">${condition + topRated}</td>
</tr>`;

  let priceCode = `<tr>
<td class="flying-table-container-td"><b>Price: ${data["itemPrice"]}</b></td>
</tr>`;
let flyingTableCode=`<table>${titleCode + categoryCode + conditionCode + priceCode}</table>`
  // flyingTable.innerHTML = titleCode + categoryCode + conditionCode + priceCode;

  // flyingTableContainer.appendChild(flyingTable);
  flyingTableContainer.innerHTML=flyingTableCode;
  flyingCardContainer.appendChild(flyingTableContainer);

  parent.appendChild(flyingCardContainer);

  return flyingCardContainer;
  //table div ends

  // let row1 = table.insertRow(0);
  // let cell1_1 = row1.insertCell(0);
  // cell1_1.setAttribute("rowspan", "4"); // Set rowspan for the first cell

  // //adding image
  // let img = createImageSection(data);
  // cell1_1.appendChild(img);

  // // add item title
  // let cell1_2 = row1.insertCell(1);
  // cell1_2.textContent = data["itemTitle"];
  // cell1_2.setAttribute("class", "item-title");

  // // add Category and redirect logo
  // let row2 = table.insertRow(1);
  // let cell2_2 = row2.insertCell(0);
  // cell2_2.textContent = "Category: " + data["itemCategoryTag"];
  // cell2_2.setAttribute("class", "item-category");
  // let redirectLogo = createRedirectLogo(data);
  // cell2_2.appendChild(redirectLogo);

  // //add Condition and top rated logo
  // let row3 = table.insertRow(2);
  // let cell3_2 = row3.insertCell(0);
  // cell3_2.textContent = "Condition: " + data["condition"];
  // cell3_2.setAttribute("class", "item-condition");
  // if (data["isTopRated"] === "true") {
  //   let topRatedLogo = createTopRatedLogo(data);
  //   cell3_2.appendChild(topRatedLogo);
  // }
  // //add price
  // let row4 = table.insertRow(3);
  // let cell4_2 = row4.insertCell(0);
  // cell4_2.textContent = "Price: " + data["itemPrice"];
  // cell4_2.setAttribute("class", "item-price");

  // // Add content to the second cell in each row
  // //   cell2.textContent = "Second Column " + (i + 1);
  // parent.appendChild(table);
  // return table;
}

function createImageSection(data) {
  let img = document.createElement("img");
  if (data["itemImageUrl"] != "") {
    img.setAttribute("src", data["itemImageUrl"]);
  } else {
    img.setAttribute("src", "https://thumbs1.ebaystatic.com/ pict/04040_0.jpg");
  }
  img.setAttribute("class", "item-card-image");
  return img;
}

function createRedirectLogo(data) {
  let redirectLogo = document.createElement("img");
  redirectLogo.setAttribute("src", "/static/images/redirect.png");
  redirectLogo.setAttribute("class", "item-redirect-logo");
  return redirectLogo;
}

function createTopRatedLogo(data) {
  let topRatedLogo = document.createElement("img");
  topRatedLogo.setAttribute("src", "/static/images/topRatedImage.png");
  topRatedLogo.setAttribute("class", "item-top-rated-logo");
  return topRatedLogo;
}

function searchAndLoadItemDetails() {
  console.log("searchAndLoadItemDetails called");
  console.log(this);
  let itemId = this.id;
  console.log(itemId);
  fetchItemDetails(itemId);
}
