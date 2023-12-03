let bought = JSON.parse(localStorage.getItem('bought'));
let table = document.querySelector('.main2');

table.innerHTML = bought.map((item, index) => {
    return `
    <tr>
        <td>${index + 1}</td>
        <td><img src="${item.url}" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>R${item.price.toFixed(2)}</td>
        <td><button class="pay-btn" data-index=${index}">Pay</button>
    </tr>`;
}).join('');

table.addEventListener('click', function(event){
    if(event.target.classList.contains('pay-btn')){
        handlePayment(event.target.dataset.index);
    }
});

function handlePayment(index) {
    alert('You have purchased your item. See you next time :)')
}