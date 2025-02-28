const categoryName = document.getElementById("category");
const tax = document.getElementById("tax");
const table = document.getElementById("table");
const categoryButton = document.getElementById("categoryButton");

let categories = [];

function addCategory() {
  getCategories();

  if (!validInput()) {
    alert("The fields should be filled!");
    return true;
  } else if (tax.value < 0 || tax.value > 100) {
    alert("Tax must be a number between 0 and 100.");
    categoryName.value = " ";
    tax.value = " ";
    return false;
  } else if (!/^[a-zA-Z\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]*$/g.test(categoryName.value)) {
    alert("Category name must be a word.");
    clearInputs();
    return false;
  }   
  
  let existingItem = categories.findIndex((category) => category.name === categoryName.value);
  if (existingItem !== -1) {
    alert("This category already exists!");
    clearInputs();
    return true;
  }
  
  const category = {
    name: categoryName.value,
    tax: tax.value,
    code: categories.length + 1,
  };
  categories.push(category);
  localStorage.setItem("categories", JSON.stringify(categories));
  showTable();
  clearInputs();
}

categoryButton.addEventListener("click", addCategory);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addCategory();
  }
});

function getCategories() {
  categories = JSON.parse(localStorage.getItem("categories")) ?? [];
}

function validInput() {
  if (!categoryName.value || !tax.value) {
    return false;
  } else {
    return true;
  }
}

function showTable() {
  table.innerHTML = `<tr>
        <th>Code</th>
        <th>Category</th>
        <th>Tax</th>
        <th>Action</th>
    </tr>`;
  let i = 0;
  for (let category of categories) {
    table.innerHTML += `
            <tr>
                <td class="td-align">${category.code}</td>
                <td>${category.name}</td>
                <td>${category.tax}%</td>
                <td><button onclick = "deleteCategory(${i})" class="cancel">Delete</button>
            </tr>`;
    i++;
  }
}

function clearInputs() {
  document.getElementById("category").value = "";
  document.getElementById("tax").value = "";
}

let products = [];

function getProducts(){
  products = JSON.parse(localStorage.getItem("products")) ?? [];
}

function deleteCategory(index) {
  getProducts();
  getCategories();
  
  const product = products.findIndex((product) => product.category === categories[index].name);
  console.log(products)
  console.log(product)
  if (product !== -1) {
    alert("You can't delete this category: you have products using it.");
    return true;
  } else {
    categories = categories.filter((_, i) => i !== index);
    localStorage.setItem("categories", JSON.stringify(categories));
  }

  showTable();
}

setInterval(() => {
  if (categoryName.type !== "text") {
      categoryName.type = "text";
  }
  if (tax.type !== "number") {
      tax.type = "number";
  }
}, 500);

getCategories();
showTable();
