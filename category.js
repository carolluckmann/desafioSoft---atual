const categoryName = document.getElementById("category");
const tax = document.getElementById("tax");
const table = document.getElementById("table");
const categoryButton = document.getElementById("categoryButton");

let categories = [];

function addCategory(){
    const category = {
        name: categoryName.value,
        tax: tax.value,
        code: categories.length + 1
    }
    categories.push(category);
    localStorage.setItem("categories", JSON.stringify(categories));
}

categoryButton.addEventListener("click", addCategory);

function getCategories(){
    categories = JSON.parse(localStorage.getItem("categories"));
}
getCategories();

function showTable(){
    table.innerHTML = 
    `<tr>
        <th>Code</th>
        <th>Category</th>
        <th>Tax</th>
        <th>Action</th>
    </tr>
    <tr>
    <td>${category.code}</td>
    <td>${category.name}</td>
    <td>${category.tax}</td>
    <td class="button-category"><input type="submit" value="Delete" class="cancel"></td>
    </tr>`
}

// function validInput(){
//     if (!categoryName.value || !tax.value){
//        return true
//     } else {
//         return false
//     }
// }

// function validAll(){
//     if(validInput()){
//         alert ("The fields should be filled!")
//         return true
//     } else {
//         return false
//     }
// }

// getCategories();
// validAll();
showTable();