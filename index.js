const product = document.getElementById("product");
const amount = document.getElementById("amount");
const tax = document.getElementById("tax");
const price = document.getElementById("price");
const productSelect = document.getElementById("productSelect")
const table = document.getElementById("table");
const addToCartButton = document.getElementById("addToCartButton");

let categories = [];

function getCategories(){
    categories = JSON.parse(localStorage.getItem("categories")) ?? [];
}

let products = [];

function getProducts(){
    products = JSON.parse(localStorage.getItem("products")) ?? [];
}

function showProducts(){
    products.forEach((p) => {
        product.innerHTML += 
        `<option id="product" value="${p.name}">${p.name}</option>`
        }
    )
}

let items = [];

function addItems(){
    const forbbiden = /<\/?[a-z][\s\S]*>/i;
    if(!validInput()){
        alert ("The fields should be filled!")
        return true
    } else if (forbbiden.test(productName.value)) {
        alert("Invalid input!");
        product.value = " ";
        amount.value = " ";
        price.value = " ";
        category.value = " ";
        return false;
    }
    const item = {
        name: product.value,
        amount: amount.value,
        price: price.value,
        tax: tax.value,    
    }
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    getProducts();
    showTable();
    clearInputs();
}

addToCartButton.addEventListener("click", addItems);

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addItems();
    }
});

function getItems(){
    items = JSON.parse(localStorage.getItem("items")) ?? [];
}

function validInput(){
    if (!product.value || !amount.value || !price.value || !tax.value){
       return false
    } else {
        return true
    }
}

function clearInputs(){
    document.getElementById("product").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("price").value = "";
    document.getElementById("tax").value = "";
}

function deleteProduct(index){
    items = items.filter((_, i) => i !== index);

    localStorage.setItem("items", JSON.stringify(items))

    getItems();
    showTable();
}

function showTable(){
    table.innerHTML = 
    `<tr>
        <th>Product</th>
        <th>Amount</th>
        <th>Price</th>
        <th>Tax</th>
        <th>Action</th>
    </tr>`
    let i = 0
    for (let item of items) {
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.amount} units</td>
                <td>$${item.price}</td>
                <td>${item.tax}</td>
                <td><button onclick = "deleteProduct(${i})" class="cancel">Delete</button></td>
            </tr>`;
            i++
    }
}

getItems();
deleteProduct();
showTable();
getProducts();
showProducts();