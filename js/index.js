const amount = document.getElementById("amount");
const tax = document.getElementById("tax");
const price = document.getElementById("price");
const productSelect = document.getElementById("productSelect")
const table = document.getElementById("table");
const addToCartButton = document.getElementById("addToCartButton")
const finalResult = document.getElementById("final-result");

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
        productSelect.innerHTML += 
        `<option id="product" value="${p.name}">${p.name}</option>`
        }
    )
}

function findProductInfo(){
    const product = products[products.findIndex((p) => p.name == productSelect.value)];

    const productTax = categories[categories.findIndex((c) => c.name == product.category)].tax;

    tax.value = `${productTax}`;

    price.value = `${product.price}`;
};

productSelect.addEventListener("change", findProductInfo);

let items = [];

function addItems(){
    const forbbiden = /<\/?[a-z][\s\S]*>/i;
    if(!validInput()){
        alert ("The fields should be filled!")
        return true
    } else if (forbbiden.test(productSelect.value)) {
        alert("Invalid input!");
        productSelect.value = " ";
        amount.value = " ";
        price.value = " ";
        return false;
    }
    const item = {
        name: productSelect.value,
        amount: amount.value,
        price: price.value,
        tax: tax.value,  
        total: amount.value * price.value  
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
    if (!amount.value){
       return false
    } else {
        return true
    }
}

function clearInputs(){
    document.getElementById("productSelect").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("price").value = "";
    document.getElementById("tax").value = "";
}

function showTable(){
    table.innerHTML = 
    `<tr>
        <th>Product</th>
        <th>Amount</th>
        <th>Price</th>
        <th>Tax</th>
        <th>Total</th>
        <th>Action</th>
    </tr>`
    let i = 0
    for (let item of items) {
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.amount} units</td>
                <td>$${item.price}</td>
                <td>${item.tax}%</td>
                <td>$${item.total}</td>
                <td><button onclick = "deleteProduct(${i})" class="cancel">Delete</button></td>
            </tr>`;
            i++
    }
}

function deleteProduct(index){
    items = items.filter((_, i) => i !== index);

    localStorage.setItem("items", JSON.stringify(items))

    getItems();
    showTable();
}

function showResult(){

    let totalTax = (tax.value/100) * amount.value;
    // let totalCart = (item.total)
    finalResult.innerHTML = `
    <p><b>Tax:</b> $${totalTax}</p>
    <p><b>Total:</b>$${totalTax}</p>
    `
}

function openModal(){
    const modal = document.getElementById('modal-container')
    modal.classList.add('show')
    modal.addEventListener('click', (e) =>{
        if (e.target.id == 'modal-container' || e.target.id == "close"){
            modal.classList.remove('show')
            localStorage.fechaModal = 'modal-container'
        }
    })
}

getItems();
deleteProduct();
showTable();
getProducts();
getCategories();
showProducts();
showResult();