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
  "Scrunchies",
  "Scrunchies are stylish hair accessories made of elastic fabric, designed to gently hold hair in a loose ponytail or bun, adding a trendy and comfortable touch to hairstyles. So cute and stylish for every occasion.",
  20.0,
  "https://i.postimg.cc/DZYpp7y3/scrunchies.jpg"
);

let item2 = new Item(
  2,
  "Hairpins",
  "Hairpins are small, versatile hair accessories used to secure and style hair. Typically made of metal or plastic, they come in various designs, providing a practical and decorative solution for hairstyles.",
  15.0,
  "https://i.postimg.cc/bJJLX4s0/hairpin.jpg"
);

let item3 = new Item(
  3,
  "Angel Brush",
  "An angel brush is a gentle and ergonomic hairbrush designed for effortless detangling and smoothing. Its unique bristle configuration minimizes breakage, leaving hair silky and knot-free with ease.",
  50.0,
  "https://i.postimg.cc/fy6hSx6F/angel-brush.jpg"
);

let item4 = new Item(
  4,
  "Necklaces",
  "Decorative accessories worn around the neck, typically consisting of a chain or cord that holds a pendant, gemstone, or other ornament, adding a stylish and personal touch to one's attire.",
  50.0,
  "https://i.postimg.cc/MKmSpj9s/necklaces.jpg"
);

let item5 = new Item(
  5,
  "Keychains",
  "Keychains are portable accessories designed to hold keys and other small items. They come in various shapes, materials, and designs, serving as practical tools and personal expressions of style.",
  40.0,
  "https://i.postimg.cc/mZ696tY5/keychains.jpg"
);

// Putting accessories in an array
accessories.push(item1, item2, item3, item4, item5);

function store() {
    // Setting array to local storage using stringify so that it becomes a string
    localStorage.setItem('accessories', JSON.stringify(accessories));
}

//putting the array in a table with table headings
function SHANK() {
  //selecting the table element on the document where the array will be displayed in
    let table = document.querySelector('table');
    //adding headings as well as the information in the array onto the html document 
    table.innerHTML = `
        <tr> 
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    `; // mapping the array to populate the table
    let jewelry = accessories.map(function (item, index) {
        return `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>R${item.price.toFixed(2)}</td>
        <td>${item.description}</td>
        <td><img src="${item.url}" alt="${item.name}"></img></td>
        <td><button class="edit" data-index="${index}">Edit</button></td>
        <td><button class="delete" data-index="${index}">Delete</button></td>
        </tr>`;
    });
    

  table.innerHTML += jewelry.join(""); //removes the comma/colon from the table

  //declaring the edit button
  let editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = button.getAttribute("data-index");
      openEditForm(accessories[index]);
    });
  });

    // declaring the delete button with the class of delete, for each button there is an event listener 
    // with the attribute of its index, when it is clicked to delete something it checks the index in the array
    // and then removes the index and information in the array
    let deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
            remove(button.getAttribute('data-index'), SHANK);
        });
    });
}

function remove(position, callback) {
  // removes one element at the position removed in the array
    accessories.splice(position, 1);
    //updating the array in local storage
    store();
    //calling function to do actions after removed
    callback();
}

store();
SHANK();

// Function to open the edit form
function openEditForm(item) {
  // getting back elements from the edit form
    const editNameInput = document.getElementById('editName');
    const editDescriptionInput = document.getElementById('editDescription');
    const editPriceInput = document.getElementById('editPrice');
    const editImageInput = document.getElementById('editImage');
    const editForm = document.getElementById('editForm');

  if (item) {
    editNameInput.value = item.name;
    editDescriptionInput.value = item.description;
    editPriceInput.value = item.price;
    editImageInput.value = item.url;
    editForm.setAttribute("data-index", item.id); // Store the index in the form
  }

  editForm.style.display = "block";
}

// Event listener for the "Save" button in the edit form
document.getElementById("saveEdit").addEventListener("click", function () {
  const rowIndex = document
    .getElementById("editForm")
    .getAttribute("data-index");

  // Ensure the index is valid
  if (rowIndex === null) {
    console.error("Invalid row index");
    return;
  }

  const selectedItem = accessories.find((item) => item.id == rowIndex);
  selectedItem.name = document.getElementById("editName").value;
  selectedItem.description = document.getElementById("editDescription").value;
  selectedItem.price = parseFloat(document.getElementById("editPrice").value);
  selectedItem.url = document.getElementById("editImage").value;

  // Update the table and close the edit form
  SHANK();
  closeEditForm();
});

// Event listener for the Cancel button in the edit form
document.getElementById("cancelEdit").addEventListener("click", function () {
  closeEditForm();
});

// Event listener for the Save button in the edit form
document.getElementById("saveEdit").addEventListener("click", function () {
  const rowIndex = document.getElementById;

  // Ensure the index is valid
  if (rowIndex === null) {
    console.error("Invalid row index");
    return;
  }

  const selectedItem = accessories.find((item) => item.id == rowIndex);
  selectedItem.name = document.getElementById("editName").value;
  selectedItem.description = document.getElementById("editDescription").value;
  selectedItem.price = parseFloat(document.getElementById("editPrice").value);
  selectedItem.url = document.getElementById("editImage").value;

    // Update the table to add the edited information and close the edit form
    SHANK();
    // closes the edit form after changes made are saved
    closeEditForm();
});

// Event listener for the "Cancel" button in the edit form
document.getElementById('cancelEdit').addEventListener('click', function () {
    // Close the edit form without saving changes
    closeEditForm();
});


//function to add product
document.addEventListener("DOMContentLoaded", function () {
  function addProduct() {
    // Update storage and display
    store();
    SHANK();

    // Close the add product modal
    closeAddProductModal();
  }

    // when the button is clicked the add product function is triggered
    document.getElementById('addProductButton').addEventListener('click', addProduct);
});

// Function to close the edit form modal
function closeEditForm() {
  // getting the edit form by its id
    const editForm = document.getElementById('editForm');
    editForm.style.display = 'none';
}

// Function to close the add product modal
function closeAddProductModal() {
  // getting the add product modal by its id
    document.getElementById('addProductModal').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
  function addProduct() {
    const newName = document.getElementById("newName");
    const newImg = document.getElementById("newImg");
    const newDes = document.getElementById("newDes");
    const newPrice = document.getElementById("newPrice");
    const resultElement = document.getElementById("result");

    // Clear previous results
    resultElement.innerHTML = "";

    event.preventDefault();

    if (
      newName.value === "" ||
      newImg.value === "" ||
      newDes.value === "" ||
      newPrice.value === ""
    ) {
      alert("Please fill in all fields to add a new product!");
    } else {
      accessories.push(
        new Item(
          accessories.length + 1,
          newName.value,
          newDes.value,
          parseFloat(newPrice.value),
          newImg.value
        )
      );

      // Clear input fields
      newName.value = "";
      newImg.value = "";
      newDes.value = "";
      newPrice.value = "";

            // Update storage of the array and display on the html
            store();
            SHANK();
        }
    }

  // combine the addProduct function to a button or an event listener
  document
    .getElementById("addProductButton")
    .addEventListener("click", addProduct);
});


document.addEventListener("DOMContentLoaded", function () {
  function addProduct() {
    const newName = document.getElementById("newName");
    const newImg = document.getElementById("newImg");
    const newDes = document.getElementById("newDes");
    const newPrice = document.getElementById("newPrice");
    const resultElement = document.getElementById("result");
    const spinner = document.getElementById("spinner");

    // Show the spinner
    spinner.style.display = "block";

    // Clear previous results
    resultElement.innerHTML = "";

    event.preventDefault();

    if (!newName || !newImg || !newDes || !newPrice) {
      console.error("One or more input elements not found.");
      return;
    }

    if (
      newName.value === "" ||
      newImg.value === "" ||
      newDes.value === "" ||
      newPrice.value === ""
    ) {
      alert("You have added a new product!");
    } else {
      // Simulating an asynchronous operation (e.g., an API call)
      setTimeout(function () {
        accessories.push(
          new Item(
            accessories.length + 1,
            newName.value,
            newDes.value,
            parseFloat(newPrice.value),
            newImg.value
          )
        );

        // Clear input fields
        newName.value = "";
        newImg.value = "";
        newDes.value = "";
        newPrice.value = "";

        // Update storage and display
        store();
        SHANK();

                // Hide the spinner after 5 seconds
                setTimeout(function () {
                    spinner.style.display = 'none';
                }, 5000);
            }, 1000); // Simulating a delay of 1 second 
        }
    }

  // combine the addProduct function to a button or an event listener
  document
    .getElementById("addProductButton")
    .addEventListener("click", addProduct);
});

document.addEventListener("DOMContentLoaded", function () {
  // Initial display of products
  SHANK();

  // Event listener for the sort dropdown
  document.getElementById("sortSelect").addEventListener("change", function () {
    const sortOption = this.value;

    // Sort the accessories based on the selected option
    if (sortOption === "price-asc") {
      accessories.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      accessories.sort((a, b) => b.price - a.price);
    }

    // Update the displayed products
    SHANK();
  });
});
