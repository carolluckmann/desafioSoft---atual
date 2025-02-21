const categoryName = document.getElementById("category");
const tax = document.getElementById("tax");
const table = document.getElementById("table");
const categoryButton = document.getElementById("categoryButton");

let categories = [];

function addCategory(){
    const forbbiden = /<\/?[a-z][\s\S]*>/i;
    if(!validInput()){
        alert ("The fields should be filled!")
        return true;
    } else if (forbbiden.test(categoryName.value)) {
        alert("Invalid input!");
        categoryName.value = " ";
        tax.value = " ";
        return false;
    } else if (tax.value < 0 || tax.value > 100) {
        alert("Tax must be a number between 0 and 100.");
        categoryName.value = " ";
        tax.value = " ";
        return false;
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

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addCategory();
    }
});

function getCategories(){
    categories = JSON.parse(localStorage.getItem("categories")) ?? [];
}

function validInput(){
        if (!categoryName.value || !tax.value){
           return false
        } 
        else {
            return true;
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
    let i = 0;
    for (let category of categories) {
        table.innerHTML += `
            <tr>
                <td class="td-align">${category.code}</td>
                <td>${category.name}</td>
                <td>${category.tax}%</td>
                <td class="button-category"><button onclick = "deleteCategory(${i})" class="cancel">Delete</button></td>
            </tr>`;
            i++
    }
}

function deleteCategory(index){
    categories = categories.filter((_, i) => i !== index);

    localStorage.setItem("categories", JSON.stringify(categories))

    getCategories()
    showTable()
}

getCategories();
deleteCategory();
showTable();
