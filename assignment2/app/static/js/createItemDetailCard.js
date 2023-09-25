function createItemDetailsCard(rsp) {
  console.log("Creating Item Details Card for itemId: " + rsp.data["itemId"]);
  let parent = document.getElementById("card-container");
  // remove childrens
  console.log("Removing all childrens of card-container");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  let itemCard = createItemCardTable(rsp.data);
  parent.appendChild(itemCard);
}

function createItemCardTable(data) {
  let table = document.createElement("table");
  table.setAttribute("class", "one-item-table");
  table.setAttribute("id", data["itemId"]);
  table.setAttribute("border", "1");

  for (var key in data) {
    if (key == "photo") {
      createAndInsertImageElement(table, data);
    } else if (key == "productLink") {
      createAndInsertLinkElement(table, data);
    } else {
      createAndInsertNormalElement(table, key, data);
    }
  }
  return table;
}

function createAndInsertImageElement(table, data) {
  var photo = table.insertRow();
  var photoField = photo.insertCell(0);
  photoField.innerHTML = "Photo";
  photoField.setAttribute("class", "one-item-table-field");
  var photoValue = photo.insertCell(1);
    var img = document.createElement("img");
  img.setAttribute("src", data["photo"]);
  img.setAttribute("alt", "Item Photo");
  img.setAttribute("class", "one-item-table-image");
  photoValue.appendChild(img);
}


function createAndInsertLinkElement(table, data) {
  var link = table.insertRow();
  var linkField = link.insertCell(0);
  linkField.innerHTML = "eBay Link";
  var linkValue = link.insertCell(1);
  linkValue.innerHTML =
    "<a href=" + data["productLink"] + ">eBay Product Link</a>";
  linkValue.setAttribute("class", "one-item-table-link");
}

function createAndInsertNormalElement(table, key, data) {
  var row = table.insertRow();
  var field = row.insertCell(0);
  field.innerHTML = key;
  field.setAttribute("class", "one-item-table-field");
  var value = row.insertCell(1);
  value.innerHTML = data[key];
  value.setAttribute("class", "one-item-table-value");
}
