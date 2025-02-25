const productName = document.getElementById("product");
const amount = document.getElementById("amount");
const unitPrice = document.getElementById("unitPrice");
const category = document.getElementById("categorySelect");
const table = document.getElementById("table");
const productButton = document.getElementById("productButton");

let categories = [];

function getCategories(){
    categories = JSON.parse(localStorage.getItem("categories")) ?? [];
}

function showCategories(){
    categories.forEach((c) => {
        category.innerHTML += 
        `<option id="categorySelect" value="${c.name}">${c.name}</option>`
        }
    )
}

let products = [];

function addProducts(){
    const forbbiden = /<\/?[a-z][\s\S]*>/i;
    if(!validInput()){
        alert ("The fields should be filled!")
        return true
    } else if (forbbiden.test(productName.value)) {
        alert("Invalid input!");
        productName.value = " ";
        amount.value = " ";
        unitPrice.value = " ";
        category.value = " ";
        return false;
    }
    const product = {
        code: products.length+1,
        name: productName.value,
        amount: amount.value,
        price: unitPrice.value,
        category: category.value,    
    }
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    getCategories();
    showTable();
    clearInputs();
}

productButton.addEventListener("click", addProducts);

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addProducts();
    }
});

function getProducts(){
    products = JSON.parse(localStorage.getItem("products")) ?? [];
}

function validInput(){
    if (!productName.value || !amount.value || !unitPrice.value || !category.value){
       return false
    } else {
        return true
    }
}

function showTable(){
    table.innerHTML = 
    `<tr>
        <th>Code</th>
        <th>Product</th>
        <th>Amount</th>
        <th>Unit Price</th>
        <th>Category</th>
        <th>Action</th>
    </tr>`
    let i = 0
    for (let product of products) {
        table.innerHTML += `
            <tr>
                <td>${product.code}</td>
                <td>${product.name}</td>
                <td>${product.amount} units</td>
                <td>$${Number(product.price).toFixed(2)}</td>
                <td>${product.category}</td>
                <td><button onclick = "deleteProduct(${i})" class="cancel">Delete</button></td>
            </tr>`;
            i++
    }
}

function clearInputs(){
    document.getElementById("product").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("unitPrice").value = "";
    document.getElementById("categorySelect").value = "";
}

function deleteProduct(index){
    products = products.filter((_, i) => i !== index);

    localStorage.setItem("products", JSON.stringify(products))

    getProducts();
    showTable();
}

getProducts();
deleteProduct();
showTable();
getCategories();
showCategories();