// Products stored
let accessories = [];

// Constructor function to create items
function Item(id, name, description, price, url) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.url = url;
}

let item1 = new Item(
    1,
    'Scrunchies',
    'A comfortable and stylish way to secure ponytails or buns.',
    20.00,
    'https://i.postimg.cc/DZYpp7y3/scrunchies.jpg'
);

let item2 = new Item(
    2,
    'Hairpins',
    'Designed to secure and style hair by holding it in place, offering a practical and elegant solution for various hairstyles.',
    15.00,
    'https://i.postimg.cc/bJJLX4s0/hairpin.jpg'
);

let item3 = new Item(
    3,
    'Angel Brush',
    'Designed to detangle hair smoothly and minimize breakage, providing a delicate and effective styling tool.',
    50.00,
    'https://i.postimg.cc/fy6hSx6F/angel-brush.jpg'
);

let item4 = new Item(
    4,
    'Necklaces',
    'Decorative accessories worn around the neck, typically consisting of a chain or cord that holds a pendant, gemstone, or other ornament, adding a stylish and personal touch to one\'s attire.',
    50.00,
    'https://i.postimg.cc/MKmSpj9s/necklaces.jpg'
);

let item5 = new Item(
    5,
    'Keychains',
    'Serving as practical accessories to organize and personalize keys, often reflecting individual tastes or interests.',
    40.00,
    'https://i.postimg.cc/mZ696tY5/keychains.jpg'
);

// Putting accessories in an array
accessories.push(item1, item2, item3, item4, item5);

function store() {
    // Setting array to local storage
    localStorage.setItem('accessories', JSON.stringify(accessories));
}

function SHANK() {
    let table = document.querySelector('table');
    let jewelry = accessories.map(function (item, index) {
        return `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>R${item.price.toFixed(2)}</td>
        <td>${item.description}</td>
        <td><img src="${item.url}" alt="${item.name}"></img></td>
        <td><button class="edit">Edit</button></td>
        <td><button class="delete" value="${index}">Delete</button></td>
        </tr>`;
    });

    table.innerHTML = jewelry.join('');

    let deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
            remove(button.value, SHANK);
        });
    });
}

function remove(position, callback) {
    accessories.splice(position, 1);
    store();
    callback();
}

store();
SHANK();

 // Function to open the edit form
 function openEditForm(item) {
    document.getElementById('editName').value = item.name;
    document.getElementById('editDescription').value = item.description;
    document.getElementById('editPrice').value = item.price;
    document.getElementById('editImage').value = item.url;
    document.getElementById('editForm').style.display = 'block';
}

// Function to close the edit form
function closeEditForm() {
    document.getElementById('editForm').style.display = 'none';
}

// Event listener for the "Edit" button
document.querySelector('table').addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
        const selectedItem = accessories[event.target.parentElement.parentElement.rowIndex - 1];
        openEditForm(selectedItem);
    }
});

// Event listener for the "Save" button in the edit form
document.getElementById('saveEdit').addEventListener('click', function () {
    // Update the selected accessory with the edited values
    const selectedItem = accessories[event.target.parentElement.parentElement.rowIndex - 1];
    selectedItem.name = document.getElementById('editName').value;
    selectedItem.description = document.getElementById('editDescription').value;
    selectedItem.price = parseFloat(document.getElementById('editPrice').value);
    selectedItem.url = document.getElementById('editImage').value;

    // Update the table and close the edit form
    SHANK();
    closeEditForm();
});

// Event listener for the "Cancel" button in the edit form
document.getElementById('cancelEdit').addEventListener('click', function () {
    closeEditForm();
});
