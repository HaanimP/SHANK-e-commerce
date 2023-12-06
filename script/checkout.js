// getting the items from localstorage from the array that was bought
let bought = JSON.parse(localStorage.getItem('bought'));
// setting the table into the main
let table = document.querySelector('.main2');
let totalAmountElement = document.getElementById('totalAmount');
let payButton = document.getElementById('payButton');

// the function to calculate the amount of all the products bought
function calculateTotalAmount() {
    //reduce function () calculates the total amount by iterating over the array for things being bought
    let totalAmount = bought.reduce((total, item, index) => {
        // The quantity of the item is obtained from an input field
        // anded a 'data-index' attribute matching the current index into the loop.
        const quantity = document.querySelector(`.quantity-input[data-index="${index}"]`).value;
        // total = adding the product of the item's price and the quantity.
        return total + item.price * quantity;
    }, 0).toFixed(2);  //result is converted to a string with exactly two decimal places using the toFixed(2) method.

    // The totalAmount is then assigned to the 'textContent' property of an element for the display on css
    totalAmountElement.textContent = `Total Amount: R${totalAmount}`;
}

table.querySelector('tbody').innerHTML = bought.map((item, index) => {
    return `
    <tr>
        <td>${index + 1}</td>
        <td><img src="${item.url}" alt="${item.name}" style="max-width: 50px;"></td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>R${item.price.toFixed(2)}</td>
        <td>
            <input type="number" class="quantity-input" placeholder="Qty" min="1" value="1" data-index=${index}>
        </td>
    </tr>`;
}).join('');

table.addEventListener('input', function(event){ // event parameter contains information about the input event
    if(event.target.classList.contains('quantity-input')){
        // Pass both the index and quantity to the handlePayment function
        handlePayment(event.target.dataset.index, event.target.value);
        calculateTotalAmount(); // calling function to update amount
    }
});

payButton.addEventListener('click', function() {
    alert('Payment completed. Thank you for your purchase!');
    // Add any additional logic for completing the payment
});

// handles the payment for item at index and with quantity chosen
function handlePayment(index, quantity) {
    // Use the quantity parameter in your logic
    alert(`You have selected ${quantity} ${quantity > 1 ? 'items' : 'item'} of ${bought[index].name}.`);
}