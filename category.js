const categoryName = document.getElementById("category");
const tax = document.getElementById("tax");
const table = document.getElementById("table");
const categoryButton = document.getElementById("categoryButton");

let categories = [];

function addCategory(){
    if(!validInput()){
        alert ("The fields should be filled!")
        return true
    }
    const category = {
        name: categoryName.value,
        tax: tax.value,
        code: categories.length+1
    }
    categories.push(category);
    localStorage.setItem("categories", JSON.stringify(categories));
    showTable();
}

categoryButton.addEventListener("click", addCategory);

function getCategories(){
    categories = JSON.parse(localStorage.getItem("categories")) ?? [];
}

function validInput(){
        if (!categoryName.value || !tax.value){
           return false
        } else {
            return true
        }
    }

function showTable(){
    table.innerHTML = 
    `<tr>
        <th>Code</th>
        <th>Category</th>
        <th>Tax</th>
        <th>Action</th>
    </tr>`
    
    for (let category of categories) {
        table.innerHTML += `
            <tr>
                <td>${category.code}</td>
                <td>${category.name}</td>
                <td>${category.tax}</td>
                <td class="button-category"><button onclick = "deleteCategory(${i})" class="cancel">Delete</button></td>
            </tr>`;
    }
}

let i = 0;

function deleteCategory(index){
    categories = categories.filter((_, i) => i !== index);

    localStorage.setItem("categories", JSON.stringify(categories))

    getCategories()
    showTable()
}

getCategories();
deleteCategory();
showTable();
