let bought = JSON.parse(localStorage.getItem('bought'));
let table = document.querySelector('.main2');
let totalAmountElement = document.getElementById('totalAmount');
let payButton = document.getElementById('payButton');

// Function to calculate the total amount
function calculateTotalAmount() {
    let totalAmount = bought.reduce((total, item, index) => {
        const quantity = document.querySelector(`.quantity-input[data-index="${index}"]`).value;
        return total + item.price * quantity;
    }, 0).toFixed(2);

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

// Add an event listener for input changes
table.addEventListener('input', function(event){
    if(event.target.classList.contains('quantity-input')){
        // Pass both the index and quantity to the handlePayment function
        handlePayment(event.target.dataset.index, event.target.value);
        calculateTotalAmount();
    }
});

payButton.addEventListener('click', function() {
    alert('Payment completed. Thank you for your purchase!');
    // Add any additional logic for completing the payment
});

function handlePayment(index, quantity) {
    // Use the quantity parameter in your logic
    alert(`You have selected ${quantity} ${quantity > 1 ? 'items' : 'item'} of ${bought[index].name}.`);
}