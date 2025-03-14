const amount = document.getElementById("amount");
const tax = document.getElementById("tax");
const price = document.getElementById("price");
const productSelect = document.getElementById("productSelect");
const table = document.getElementById("table");
const total = document.getElementById("total");
const addToCartButton = document.getElementById("addToCartButton");
const finalResult = document.getElementById("final-result");
const taxPrice = document.getElementById("taxPrice");
const purchaseHistory = document.getElementById("purchaseHistory");

let categories = [];

function getCategories() {
  categories = JSON.parse(localStorage.getItem("categories")) ?? [];
}

let products = [];

function getProducts() {
  products = JSON.parse(localStorage.getItem("products")) ?? [];
}

function showProducts() {
  productSelect.innerHTML =
    "<option value='' selected hidden>Select a product</option>";
  console.log(products);
  products.forEach((p) => {
    let option = document.createElement("option");
    option.value = p.name;
    option.textContent = p.name;
    if (p.amount > 0) {
      productSelect.appendChild(option);
    }
  });
}

function findProductInfo() {
  const product = products.find((p) => p.name === productSelect.value);
  const category = categories.find((c) => c.name === product.category);

  tax.value = `${category.tax}%`;
  price.value = `$${Number(product.price).toFixed(2)}`;
}
productSelect.addEventListener("change", findProductInfo);

let items = [];

function addItems() {
  if (!validInput()) {
    alert("The fields should be filled!");
    return;
  } else if (productSelect.value == null || productSelect.value == "") {
    alert("Select a product before continue...");
    return true;
  } else if (amount.value <= 0) {
    alert("Amount must be a positive number.");
    clearInputs();
    return false;
  } else if (!amountProduct()) {
    alert("It's impossible to add this amount, we don't have it in stock");
    clearInputs();
    return;
  }
  let existingItem = items.findIndex(
    (item) => item.name === productSelect.value
  );
  if (existingItem !== -1) {
    items[existingItem].amount =
      Number(items[existingItem].amount) + Number(amount.value);
    items[existingItem].total =
      Number(items[existingItem].amount) * Number(items[existingItem].price);
  } else {
    const item = {
      name: productSelect.value,
      amount: Number(amount.value),
      price: Number(price.value.toString().replace("$", "")),
      tax: Number(tax.value.toString().replace("%", "")),
      total:
        Number(amount.value) * Number(price.value.toString().replace("$", "")),
    };
    items.push(item);
  }
  localStorage.setItem("items", JSON.stringify(items));

  showTable();
  clearInputs();
}
addToCartButton.addEventListener("click", addItems);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addItems();
  }
});

function getItems() {
  items = JSON.parse(localStorage.getItem("items")) ?? [];
}

function amountProduct() {
  let productAmount =
    products[products.findIndex((p) => p.name == productSelect.value)].amount;
  let productIndexOnCart = items.findIndex(
    (p) => p.name == productSelect.value
  );
  let onCart = 0;
  if (productIndexOnCart !== -1) {
    onCart = items[productIndexOnCart].amount;
  }
  if (Number(amount.value) + Number(onCart) > Number(productAmount)) {
    return false;
  } else {
    return true;
  }
}

function validInput() {
  if (!amount.value) {
    return false;
  } else {
    return true;
  }
}

function showTable() {
  if (items.length === 0) {
    table.innerHTML = `There's no products yet!`;
    return;
  }
  table.innerHTML = `<tr>
        <th>Product</th>
        <th>Amount</th>
        <th>Price</th>
        <th>Tax</th>
        <th>Total</th>
        <th>Action</th>
    </tr>`;

  let i = 0;
  for (let item of items) {
    table.innerHTML += `
        <tr>
        <td>${item.name}</td>
        <td>${item.amount} units</td>
        <td>$${Number(item.price).toFixed(2)}</td>
        <td>${item.tax}%</td>
        <td>$${Number(item.total).toFixed(2)}</td>
        <td><button onclick = "deleteProduct(${i})" class="cancel">Delete</button></td>
            </tr>`;
    i++;
  }
  showResult();
}

function clearInputs() {
  document.getElementById("productSelect").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("price").value = "";
  document.getElementById("tax").value = "";
}

function deleteProduct(index) {
  items = items.filter((_, i) => i !== index);

  localStorage.setItem("items", JSON.stringify(items));

  getItems();
  showTable();
  showResult();
}

function showResult() {
  cartTotal = 0;
  fullTax = 0;

  for (let item of items) {
    cartTotal = Number(cartTotal) + Number(item.total);
    fullTax =
      Number(fullTax) +
      (Number(item.tax) / 100) * Number(item.price) * Number(item.amount);
  }

  taxPrice.innerHTML = `<b>Tax:</b> $${fullTax.toFixed(2)}`;
  total.innerHTML = `<b>Total:</b> $${(cartTotal + fullTax).toFixed(2)}`;
}

function cancelPurchase() {
  if (items.length === 0) {
    alert("Your cart is empty!");
    return;
  } else if (
    confirm(
      "Are you sure? This action will remove all the items of your cart!"
    ) == true
  ) {
    localStorage.setItem("items", JSON.stringify([]));
  }

  getItems();
  showTable();
  showResult();
}

function finishPurchase() {
  if (items.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let purchase = {
    code: history.length + 1,
    tax: Number(fullTax).toFixed(2),
    total: Number(Number(fullTax) + Number(cartTotal)).toFixed(2),
    products: [...items],
  };
  history.push(purchase);
  localStorage.setItem("history", JSON.stringify(history));

  let products = JSON.parse(localStorage.getItem("products")) || [];
  items.forEach((cartItem) => {
    let productIndex = products.findIndex((p) => p.name === cartItem.name);
    if (productIndex !== -1) {
      products[productIndex].amount -= cartItem.amount;
    }
  });
  localStorage.setItem("products", JSON.stringify(products));

  localStorage.setItem("items", JSON.stringify([]));
  window.location.href = `./history.html`;
}

document
  .getElementById("finishButton")
  .addEventListener("click", finishPurchase);

setInterval(() => {
  if (amount.type !== "number") {
    amount.type = "number";
  }
  if (tax.type !== "text") {
    tax.type = "text";
  }
  if (price.type !== "text") {
    price.type = "text";
  }
  const currentOptions = Array.from(productSelect.options).map(
    (opt) => opt.value
  );
  const correctOptions = products.map((p) => p.name);
  // if (JSON.stringify(currentOptions) !== JSON.stringify(correctOptions)) {
  //   showProducts();
  // }
}, 500);

getItems();
deleteProduct();
showTable();
getProducts();
getCategories();
showProducts();
showResult();
