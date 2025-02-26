const purchaseDetails = document.getElementById("purchaseDetails");

function openModal() {
  const modal = document.getElementById("modal-container");
  modal.classList.add("show");
  document.addEventListener("click", getPurchaseDetails());
}

function closeModal() {
  const modal = document.getElementById("modal-container");
  modal.classList.remove("show");
  localStorage.closeModal = "modal-container";
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-container");

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});

function getPurchase() {
  let historyTable = document.getElementById("historyTable");
  let history = JSON.parse(localStorage.getItem("history")) ?? [];

  if (history.length === 0) {
    historyTable.innerHTML = "<p>No purchase history available.</p>";
    return;
  }

  historyTable.innerHTML = `<tr>
        <th>Code</th>
        <th>Tax</th>
        <th>Total</th>
    </tr>`;

  history.forEach((item, index) => {
    historyTable.innerHTML += `
           <tr>
                <td>${item.code}</td>
                <td>$${item.tax}</td>
                <td>$${Number(item.total).toFixed(2)}</td>
                <td class="button-history">
                <input onclick="getPurchaseDetails(${index})" type="submit" value="View" class="finish">
            </tr>
                <div id="modal-container" class="modal-container">
                    <div class="modal">
                      <button onclick="closeModal()" class="close" id="close">x</button>
                    </div>
                </div>`;
  });
}

function getPurchaseDetails(index) {
  let history = JSON.parse(localStorage.getItem("history")) ?? [];
  let purchase = history[index];
  let detailsContainer = document.getElementById("purchaseDetails");
  
  detailsContainer.innerHTML = `
    <h3>Purchase #${purchase.code} | Tax: $${purchase.tax} | Total: $${purchase.total}</h3>
    <br>
    <h5>Your products:</h5>
    <br>
    <table>
      <tr class="showPurchase">
        <th>Product</th>
        <th>Amount</th>
        <th>Price</th>
        <th>Tax</th>
        <th>Total</th>
      </tr>
      ${purchase.products
      .map(
      (product) => `
      <tr>
        <td>${product.name}</td>
        <td>${product.amount}</td>
        <td>$${product.price}</td>
        <td>$${product.tax}</td>
        <td>$${product.total}</td>
      </tr>
      `
      )
      .join("")}
    </table>`;
    openModal();
  }

getPurchase();
