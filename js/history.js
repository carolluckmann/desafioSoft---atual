const purchaseDetails = document.getElementById("purchaseDetails");

function openModal() {
  const modal = document.getElementById("modal-container");
  modal.classList.add("show");
  modal.addEventListener("click", (e) => {
    if (e.target.id == "modal-container" || e.target.id == "close") {
      modal.classList.remove("show");
      localStorage.closeModal = "modal-container";
    }
  });
}

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

  history.forEach((item) => {
    historyTable.innerHTML += `
            <tr>
                <td>${item.code}</td>
                <td>$${item.tax}</td>
                <td>$${Number(item.total).toFixed(2)}</td>
                <td class="button-history">
                <input onclick="openModal()" type="submit" value="View" class="finish">
            </tr>
                <div id="modal-container" class="modal-container">
                    <div class="modal">
                        <button class="close" id="close">x</button>
                        <h1>Details</h1>
                    </div>
                </div>`;
  });
}

// function getPurchaseDetails() {
//   let history = JSON.parse(localStorage.getItem("history")) ?? [];
//   let purchase = history.findIndex((i) => i.code == purchaseDetails);

//   if (!purchase == -1) {
//     document.getElementById("details").innerHTML = "<p>Purchase not found!</p>";
//     return;
//   }

//   purchaseDetails.innerHTML = `
//                 <h2>Purchase #${purchase.code}</h2>
//                 <p><strong>Tax:</strong> $${purchase.tax}</p>
//                 <p><strong>Total:</strong> $${purchase.total}</p>
//                 <h3>Products:</h3>
//                 <table border="1">
//                     <tr>
//                         <th>Product</th>
//                         <th>Amount</th>
//                         <th>Price</th>
//                         <th>Tax</th>
//                         <th>Total</th>
//                     </tr>`;
//     openModal();
// }

getPurchase();
