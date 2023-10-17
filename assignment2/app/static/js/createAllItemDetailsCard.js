let N_DISPLAY_CARDS = 10;
//variable to store all cards and their state
let TABLE_CARDS_HOLDER = [];

function deleteCards() {
  let parent = document.getElementById("card-container");
  // remove childrens
  console.log("Removing all old search from card-container");
  parent.innerHTML = "";
}
function createCards(rsp) {
  if (rsp.data == "" || rsp.data == NaN) {
    console.log("No results found for this search");
    let parent = document.getElementById("card-container");
    createNoResultsFoundCard(parent);
    return;
  }
  console.log("Creating Cards ");
  let parent = document.getElementById("card-container");
  // remove childrens
  console.log("Removing all old search from card-container");
  parent.innerHTML = "";

  createResultCards(parent, rsp.data);
  createHorizontalGreyLine(parent);
  createItemCards(parent, rsp.data["items"]);
  if (TABLE_CARDS_HOLDER.length > 3) {
    console.log("More than 3 items, Creating Show More Button");
    createShowMoreBtn(parent);
    createShowLessBtn(parent);
  }
}
function createNoResultsFoundCard(parent) {
  console.log("Removing all old search from card-container");
  parent.innerHTML = "";
  let noResultsFoundCard = document.createElement("h1");
  noResultsFoundCard.setAttribute("class", "no-results-found-card");
  noResultsFoundCard.innerHTML = "No Results Found";
  parent.appendChild(noResultsFoundCard);
}
function createHorizontalGreyLine(parent) {
  let hrLine = document.createElement("hr");
  hrLine.setAttribute("class", "horizontal-grey-line");
  parent.appendChild(hrLine);
  return hrLine;
}
function createResultCards(parent, data) {
  console.log("Creating Result Cards with data:" + data["totalResultsFound"]);
  let reqForm = document.forms["search-form"];
  let totalResultsFound = data["totalResultsFound"];
  resultsCard = document.createElement("div");
  resultsCard.setAttribute("class", "total-results-card");
  // resultsCard.innerHTML =`<p>${parseInt(totalResultsFound)} Results found for <i>${reqForm["Key words"].value}</i><p>`;
  resultsCard.innerHTML = `${parseInt(
    totalResultsFound
  )} Results found for&nbsp<i>${reqForm["Key words"].value}</i>`;
  parent.appendChild(resultsCard);
  return resultsCard;
}

function createItemCards(parent, data) {
  console.log("Creating Items Cards ");
  let n = Math.min(N_DISPLAY_CARDS, data.length);
  TABLE_CARDS_HOLDER = [];
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

function createShowLessBtn(parent) {
  let showLessBtn = document.createElement("button");
  showLessBtn.setAttribute("class", "show-less-btn");
  showLessBtn.setAttribute("id", "show-less-btn");
  showLessBtn.innerHTML = "Show Less";
  showLessBtn.addEventListener("click", showLess);
  showLessBtn.style.display = "none";
  parent.appendChild(showLessBtn);
}

function showMore() {
  if (TABLE_CARDS_HOLDER.length <= 3) {
    return;
  }
  console.log("Show More Button Clicked, adding remaining cards");
  for (let i = 3; i < TABLE_CARDS_HOLDER.length; i++) {
    TABLE_CARDS_HOLDER[i].style.display = "";
  }
  let showMoreBtn = document.getElementById("show-more-btn");
  showMoreBtn.style.display = "none";

  console.log("Scrolling to bottom");
  // document.documentElement.scrollTop = document.documentElement.scrollHeight;
  let showLessBtn = document.getElementById("show-less-btn");
  showLessBtn.style.display = "block";
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
    data["itemImageUrl"] = "https://csci571.com/hw/hw6/images/ebay_default.jpg";
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

  let titleCode = "";
  if (data["itemTitle"] != "") {
    titleCode = `<tr>
  <td class="flying-table-container-td" ><div class="title">${data["itemTitle"]}</div></td>
</tr>`;
  }
  let categoryCode = "";
  if (data["itemCategoryTag"] != "") {
    categoryCode = `<tr>
<td class="flying-table-container-td">Category: <i>${data["itemCategoryTag"]}</i>
<a src="${data["productLink"]}" target="_blank" class="item-redirect-link" ><img src="/static/images/redirect.png" class="item-redirect-logo" /></a>
</td>
</tr>`;
  }

  let conditionCode = "";
  if (data["condition"] != "") {
    let condition = `<span class="item-">Condition: ${data["condition"]}</span>`;
    let topRated = "";
    if (data["isTopRated"] === "true") {
      topRated = `<img src="/static/images/topRatedImage.png" class="item-top-rated-logo"/>`;
    }
    conditionCode = `<tr>
<td class="flying-table-container-td">${condition + topRated}</td>
</tr>`;
  }
  let priceCode = "";
  if (data["itemPrice"] != "") {
    priceCode = `<tr>
<td class="flying-table-container-td"><b>Price: ${data["itemPrice"]}</b></td>
</tr>`;
  }
  let flyingTableCode = `<table>${
    titleCode + categoryCode + conditionCode + priceCode
  }</table>`;
  // flyingTable.innerHTML = titleCode + categoryCode + conditionCode + priceCode;

  // flyingTableContainer.appendChild(flyingTable);
  flyingTableContainer.innerHTML = flyingTableCode;

  flyingCardContainer.appendChild(flyingTableContainer);
  flyingCardContainer.getElementsByClassName("item-redirect-logo")[0].addEventListener("click", openEbayItemWindow);

  parent.appendChild(flyingCardContainer);

  return flyingCardContainer;
  //table div ends
}

function openEbayItemWindow(event) {
    console.log("openEbayItemWindow called");
    let parent=this.parentElement;
    let src=parent.getAttribute('src');
    // console.log(src);
    window.open(src);
    event.stopPropagation();
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
