try {
  let bought = JSON.parse(localStorage.getItem("bought")) || [];

  // Remove duplicates from the bought array 
  bought = bought.filter(
    (item, index, self) => self.findIndex((t) => t.id === item.id) === index
  );

  // setting the table into the main
  let table = document.querySelector(".main2");
  let totalAmountElement = document.getElementById("totalAmount");
  let payButton = document.getElementById("payButton");

  // the function to calculate the amount of all the products bought
  function calculateTotalAmount() {
    try {
      // reduce function () calculates the total amount by iterating over the array for things being bought
      let totalAmount = bought
        .reduce((total, item, index) => {
          try {
            // The quantity of the item is obtained from an input field
            // and a 'data-index' attribute matching the current index into the loop.
            const quantity = document.querySelector(
              `.quantity-input[data-index="${index}"]`
            ).value;
            // total = adding the product of the item's price and the quantity.
            return total + item.price * quantity;
          } catch (error) {
            console.error(
              "Error calculating total amount for item:",
              item,
              error
            );
            return total;
          }
        }, 0)
        .toFixed(2); // result is converted to a string with exactly two decimal places using the toFixed(2) method.

      // The totalAmount is then assigned to the 'textContent' property of an element for display on CSS
      totalAmountElement.textContent = `Total Amount: R${totalAmount}`;
    } catch (error) {
      console.error("Error calculating total amount:", error);
    }
  }

  table.querySelector("tbody").innerHTML = bought
    .map((item, index) => {
      return `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${item.url}" alt="${
        item.name
      }" style="max-width: 50px;"></td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>R${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" class="quantity-input" placeholder="Qty" min="1" value="0" data-index=${index}>
                </td>
            </tr>`;
    })
    .join("");

  table.addEventListener("input", function (event) {
    // event parameter contains information about the input event
    try {
      if (event.target.classList.contains("quantity-input")) {
        // Pass both the index and quantity to the handlePayment function
        handlePayment(event.target.dataset.index, event.target.value);
        calculateTotalAmount(); // calling function to update amount
      }
    } catch (error) {
      console.error("Error handling input event:", error);
    }
  });

  // Event listener for the "Pay" button
  payButton.addEventListener("click", function () {
    try {
      alert("Payment completed. Thank you for your purchase :) !");

      // Clear the checkout page
      clearCheckoutPage();
    } catch (error) {
      console.error("Error handling click event for Pay button:", error);
    }
  });

  // handles the payment for item at index and with quantity chosen
  function handlePayment(index, quantity) {
    try {
      //alert(`You have selected ${quantity} ${quantity > 1 ? 'items' : 'item'} of ${bought[index].name}.`);

      // Convert quantity to a number
      const parsedQuantity = parseInt(quantity);

      // Check if the product is already in the 'bought' array
      const existingProductIndex = bought.findIndex(
        (item) => item.id === bought[index].id
      );

      if (existingProductIndex !== -1) {
        // If the product already exists, update the quantity
        bought[existingProductIndex].quantity = parsedQuantity;
      } else {
        // If the product is not in the array, add it with the specified quantity
        bought[index].quantity = parsedQuantity;
      }

      // Update the local storage
      localStorage.setItem("bought", JSON.stringify(bought));

      // Update the table content
      table.querySelector("tbody").innerHTML = bought
        .map((item, i) => {
          return `
                    <tr>
                        <td>${i + 1}</td>
                        <td><img src="${item.url}" alt="${
            item.name
          }" style="max-width: 50px;"></td>
                        <td>${item.name}</td>
                        <td>${item.description}</td>
                        <td>R${item.price.toFixed(2)}</td>
                        <td>
                            <input type="number" class="quantity-input" placeholder="Qty" min="1" value="${
                              item.quantity || 0
                            }" data-index=${i}>
                        </td>
                    </tr>`;
        })
        .join("");

      // Recalculate and update the total amount
      calculateTotalAmount();
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  }

  // Function to clear the checkout page
  function clearCheckoutPage() {
    try {
      // Reset the 'bought' array to an empty array
      bought = [];

      // Update the local storage
      localStorage.setItem("bought", JSON.stringify(bought));

      // Clear the table content
      table.querySelector("tbody").innerHTML = "";

      // Clear the total amount
      totalAmountElement.textContent = "Total Amount: R0.00";
    } catch (error) {
      console.error("Error clearing checkout page:", error);
    }
  }
} catch (error) {
  console.error("Error in main code block:", error);
}
