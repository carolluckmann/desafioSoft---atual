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
  } else if (!/^[a-zA-Z\s]*$/g.test(categoryName.value)) {
    alert("Category name must be a word.");
    return false;
  }   let existingItem = categories.findIndex((category) => category.name === categoryName.value);
  
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
                <td><button onclick = "deleteCategory(${i})" class="cancel">Delete</button></td>
            </tr>`;
    i++;
  }
}

function clearInputs() {
  document.getElementById("category").value = "";
  document.getElementById("tax").value = "";
}

function deleteCategory(index) {
  categories = categories.filter((_, i) => i !== index);

  localStorage.setItem("categories", JSON.stringify(categories));

  getCategories();
  showTable();
}

//Teste para não permitir alteração pelo inspecionar
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

getCategories();
deleteCategory();
showTable();
