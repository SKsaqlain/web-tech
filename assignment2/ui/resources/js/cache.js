function storeToLocalStorage() {
  let data = [];
  let form = document.forms["search-form"];
  let keyword = form["keyword"].value;
  let fromNumber = parseFloat(form["from-number"].value);
  let toNumber = parseFloat(form["to-number"].value);
  //getting checked values
  let conditionCheckboxes = document.querySelectorAll(
    'input[name="condition"]'
  );
  var checkvalues = [];
  conditionCheckboxes.forEach((checkbox) => {
    checkvalues.push(checkbox.checked);
  });
  let condition = checkvalues;
  console.log(condition);

  let seller = form["seller"].checked;

  let shippingChecked = document.querySelectorAll('input[name="shipping"]');
  var checkvalues = [];
  shippingChecked.forEach((checkbox) => {
    checkvalues.push(checkbox.checked);
  });

  let shipping = checkvalues;
  let sortBy = form["sort-by"].value;
  data.push({
    "keyword": keyword,
    "fromNumber": fromNumber,
    "toNumber": toNumber,
    "condition": condition,
    "seller": seller,
    "shipping": shipping,
    "sortBy": sortBy,
  });

  console.log(data);
  localStorage.setItem("form-data", JSON.stringify(data));
}

function clearFormAndCache() {
  localStorage.clear();
  document.forms["search-form"].reset();
  console.log("Form and Cache Cleared");
  return false;
}

function loadFromLocalStorage() {
  let data = JSON.parse(localStorage.getItem("form-data"));
  if (data == null) {
    console.log("No data in local storage");
    return;
  }
  console.log(data);
  if (data != null) {
    let form = document.forms["search-form"];
    form["keyword"].value = data[0].keyword;
    form["from-number"].value = data[0].fromNumber;
    form["to-number"].value = data[0].toNumber;

    let conditionCheckboxes = document.querySelectorAll(
      'input[name="condition"]'
    );
    if (conditionCheckboxes != null) {
      for (let i = 0; i < conditionCheckboxes.length; i++) {
        conditionCheckboxes[i].checked = data[0].condition[i];
      }
    }

    form["seller"].checked = data[0].seller;
    let shippingChecked = document.querySelectorAll('input[name="shipping"]');
    if (shippingChecked != null) {
      for (let i = 0; i < shippingChecked.length; i++) {
        shippingChecked[i].checked = data[0].shipping[i];
      }
    }
    form["sort-by"].value = data[0].sortBy;
  }
}
