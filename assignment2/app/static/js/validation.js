function validateForm() {
  let form = document.forms["search-form"];
  let keyword = form["Key words"];
  if (keyword.value == "") {
    console.log("Keyword is empty");
    keyword.required = true;
    keyword.setCustomValidity("Please fill out this field.");
    keyword.reportValidity();
    return false;
  }
  let fromNumber = parseFloat(form["from-number"].value);
  let toNumber = parseFloat(form["to-number"].value);
  // if both are null valid case
  if (isNaN(fromNumber) && isNaN(toNumber)) {
    console.log("Both fromNumber and toNumber are null");
    return true;
  }
  // if one if null and the other is not check for positive case
  if (
    (isNaN(fromNumber) && toNumber < 0) ||
    (isNaN(toNumber) && fromNumber < 0)
  ) {
    console.warn("One of the values is null and the other is negative");
    alert(
      "Price Range values cannot be negative! Please try a value greater than or equal to 0.0"
    );

    return false;
  } else if (
    (isNaN(fromNumber) && toNumber >= 0) ||
    (isNaN(toNumber) && fromNumber >= 0)
  ) {
    console.log("One of the values is null and the other is positive");
    return true;
  }

  if (toNumber < 0 || fromNumber < 0) {
    console.warn("Both fromNumber and toNumber are negative");
    alert(
      "Price Range values cannot be negative! Please try a value greater than or equal to 0.0"
    );
    return false;
  }
  if (fromNumber > toNumber) {
    console.warn("fromNumber is greater than toNumber");
    alert(
      "Oops! Lower price limit cannot be greater than upper limit !\nPlease try again."
    );
    return false;
  }
}
