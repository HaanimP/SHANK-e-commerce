let bought = [];

let main = document.querySelector('.main');

let accessories = JSON.parse(localStorage.getItem('accessories'));

function renderItems(accessories){
main.innerHTML = accessories.map(function(item, index) {
    return `
    <div class="div">
        <img class="image" src="${item.url}" alt="${item.name}">
        <h2 class="h2">${item.name}</h2>
        <p class="p">${item.description}</p>
        <p class="p">R${item.price.toFixed(2)}</p>
        <button class="cart" value="${index}" data-add>Add to Cart</button>
    </div>`;
}).join('');
}

function add(index) {
    bought.push(accessories[index]);
    localStorage.setItem('bought', JSON.stringify(bought));
}

main.addEventListener('click', function(event) {
    if (event.target.hasAttribute('data-add')) {
        add(event.target.value);
    }
});

function searchAndSort() {
    let searchBar = document.getElementById('searchBar').value.toLowerCase();
    let sortOption = document.getElementById('sortOptions').value;

    let filteredItems = accessories.filter(item => {
        return item.name.toLowerCase().includes(searchBar);
    });

    if (sortOption === 'cheapest') {
        filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'expensive') {
        filteredItems.sort((a, b) => b.price - a.price);
    }

    renderItems(filteredItems);
}

document.getElementById('searchBar').addEventListener('input', searchAndSort);
document.getElementById('sortOptions').addEventListener('change', searchAndSort);

// Initial rendering
renderItems(accessories);