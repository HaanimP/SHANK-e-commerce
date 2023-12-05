// Everything added to cart will add to the string
const localStorageKeyBought = 'bought';

//getting all the accessories from localstorage which was added on the admin page to store it on the products page
let bought = JSON.parse(localStorage.getItem(localStorageKeyBought)) || [];
let main = document.querySelector('.main');
let accessories = JSON.parse(localStorage.getItem('accessories')) || [];

//if there are no items matching the products declared, a message will appear
function renderItems(items) {
    if (items.length === 0) {
        main.innerHTML = '<p class="unknown">No items found.</p>';
    } else {
        main.innerHTML = items.map(function (item, index) {
            //putting the products declared on the admin page into cards on the products page
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
}

//putting everything added to cart into an array
function add(index) {
    bought.push(accessories[index]);
    localStorage.setItem(localStorageKeyBought, JSON.stringify(bought));
}

main.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-add')) {
        add(event.target.value);
    }
});

// creating the search function to get specific products or sorting it in cheapest to expensive
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

// if all products are deleted from the admin page, a spinner will display
if (accessories.length === 0) {
    main.innerHTML = '<div id="spinner" class="spinner" style:"display: none;"><i class="fas fa-spinner fa-spin"></i></div>';
} else {
    renderItems(accessories);
}