const productName = document.getElementById("product");
const amount = document.getElementById("amount");
const unitPrice = document.getElementById("unitPrice");
const category = document.getElementById("categorySelect");
const table = document.getElementById("table");
const productButton = document.getElementById("productButton");

let categories = [];

function getCategories() {
  categories = JSON.parse(localStorage.getItem("categories")) ?? [];
}

function showCategories() {
  let selectedValue = category.value;
    category.innerHTML = "<option value='' selected hidden>Select a category</option>";
    categories.forEach((c) => {
        let option = document.createElement("option");
        option.value = c.name;
        option.textContent = c.name;
        category.appendChild(option);
    });
    category.value = selectedValue; 
}

let products = [];

function addProducts() {
  if (!validInput()) {
    alert("The fields should be filled!");
    clearInputs();
    return true;
  } else if (category.value == null || category.value == "") {
    alert("Select a category before continue...");
    return true;
  } else if (
    !/^[0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]*$/g.test(productName.value)
  ) {
    alert("Product name must be a word.");
    clearInputs();
    return false;
  } else if (unitPrice.value <= 0) {
    alert("Price must be a positive number.");
    clearInputs();
    return false;
  } else if (amount.value <= 0) {
    alert("Amount must be a positive number.");
    clearInputs();
    return false;
  }

  let existingItem = products.findIndex(
    (product) => product.name === productName.value
  );

  if (existingItem !== -1) {
    alert("This product already exists");
    clearInputs();
    return false;
  }
  const product = {
    code: products.length > 0 ? products[products.length - 1].code + 1 : 1,
    name: productName.value,
    amount: amount.value,
    price: unitPrice.value,
    category: category.value,
  };
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  getCategories();
  showTable();
  clearInputs();
}

productButton.addEventListener("click", addProducts);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addProducts();
  }
});

function getProducts() {
  products = JSON.parse(localStorage.getItem("products")) ?? [];
}

function validInput() {
  if (
    !productName.value ||
    !amount.value ||
    !unitPrice.value ||
    !category.value
  ) {
    return false;
  } else {
    return true;
  }
}

function showTable() {
  table.innerHTML = `<tr>
        <th>Code</th>
        <th>Product</th>
        <th>Amount</th>
        <th>Unit Price</th>
        <th>Category</th>
        <th>Action</th>
    </tr>`;
  let i = 0;
  for (let product of products) {
    table.innerHTML += `
            <tr>
                <td>${product.code}</td>
                <td>${product.name}</td>
                <td>${product.amount} units</td>
                <td>$${Number(product.price).toFixed(2)}</td>
                <td>${product.category}</td>
                <td><button onclick = "deleteProduct(${i})" class="cancel">Delete</button>
            </tr>`;
    i++;
  }
}

function clearInputs() {
  document.getElementById("product").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("unitPrice").value = "";
  document.getElementById("categorySelect").value = "";
}

let items = [];

function getItems() {
  items = JSON.parse(localStorage.getItem("items")) ?? [];
}

function deleteProduct(index) {
  getProducts();
  getItems();

  const item = items.findIndex((item) => item.name === products[index].name);
  if (item !== -1) {
    alert("You can't delete this product: you have it on your cart.");
    return true;
  } 
  
  else if (
    confirm("Are you sure? This action will remove this item of your stock!") ==
    true
  ) {
    products = products.filter((_, i) => i !== index);
    localStorage.setItem("products", JSON.stringify(products));
  }

  showTable();
}

setInterval(() => {
  if (productName.type !== "text") {
    productName.type = "text";
  }
  if (amount.type !== "number") {
    amount.type = "number";
  }
  if (unitPrice.type !== "number") {
    unitPrice.type = "number";
  }
  const currentOptions = Array.from(category.options).map(
    (opt) => opt.value
  );
  const correctOptions = categories.map((c) => c.name);
  if (JSON.stringify(currentOptions) !== JSON.stringify(correctOptions)) {
    showCategories();
}}, 500);

getProducts();
showTable();
getCategories();
showCategories();
