    let localStorageKeyBought = 'bought';

    let bought;

    try {
        bought = JSON.parse(localStorage.getItem(localStorageKeyBought)) || [];
    } catch (error) {
        console.error('Error parsing "bought" from localStorage:', error);
        bought = [];
    }

    let main = document.querySelector('.main');

    let accessories;

    try {
        accessories = JSON.parse(localStorage.getItem('accessories')) || [];
    } catch (error) {
        console.error('Error parsing "accessories" from localStorage:', error);
        accessories = [];
    }

    function renderItems(items) {
        try {
            if (items.length === 0) {
                main.innerHTML = '<p class="unknown">No items found.</p>';
            } else {
                main.innerHTML = items.map(function (item, index) {
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
        } catch (error) {
            console.error('Error rendering items:', error);
        }
    }

    function add(index) {
        try {
            bought.push(accessories[index]);
            localStorage.setItem(localStorageKeyBought, JSON.stringify(bought));
        } catch (error) {
            console.error('Error adding item to the cart:', error);
        }
    }

    main.addEventListener('click', function (event) {
        try {
            if (event.target.hasAttribute('data-add')) {
                add(event.target.value);
            }
        } catch (error) {
            console.error('Error handling click event:', error);
        }
    });

    function searchAndSort() {
        try {
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
        } catch (error) {
            console.error('Error in searchAndSort function:', error);
        }
    }


    document.getElementById('searchBar').addEventListener('input', searchAndSort);
    document.getElementById('sortOptions').addEventListener('change', searchAndSort);

    // Check if all data is deleted and display a spinner
    if (accessories.length === 0) {
        main.innerHTML = '<div id="spinner" class="spinner" style:"display: none;"><i class="fas fa-spinner fa-spin"></i></div>';
    } else {
        // Initial rendering
        renderItems(accessories);
    }