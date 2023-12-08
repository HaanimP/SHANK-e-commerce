// Products stored in the array 
let accessories = [];

// Constructor function to create items to go inside the array
function Item(id, name, description, price, url) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.price = price;
  this.url = url;
}

// creating the products using a constructor function
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

// Pushing accessories into the array called accessories declared on top
accessories.push(item1, item2, item3, item4, item5);

function store() {

    // Setting array to local storage using stringify so that it becomes a string
    localStorage.setItem('accessories', JSON.stringify(accessories));
}

//the function that will display the products in the array on the table
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

  // Setting array to local storage
  localStorage.setItem("accessories", JSON.stringify(accessories));
}

//putting the array in a table with table headings
function SHANK() {
  let table = document.querySelector("table");
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
        `;
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


    table.innerHTML += jewelry.join(''); // the variable declared to populate the array onto the html

    // declaring the edit button with the class of edit, for each button there is an event listener 
    // with the attribute of its index, when it is clicked to open the edit form it checks the index in the array
    let editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const index = button.getAttribute('data-index');
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

  //declaring the delete button
  let deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      remove(button.getAttribute("data-index"), SHANK);

    });
  });
}

// removes products in the array when the delete button is clicked and changes the length of the array
// calling back the function where the products were stored in local storage to adjust the new array
function remove(position, callback) {

  // removes one element at the position removed in the array
    accessories.splice(position, 1);
    //updating the array in local storage
    store();
    //calling function to do actions after removed
    callback();

  accessories.splice(position, 1);
  store();
  callback();

}

// calling the function to display the new array after something was removed out of the array
// calling the function to remove that item from the table
store();
SHANK();

// Function to open the edit form
//edits the information in the table displaying already by getting the id for the specefic elements
function openEditForm(item) {

  // getting back elements from the edit form
    const editNameInput = document.getElementById('editName');
    const editDescriptionInput = document.getElementById('editDescription');
    const editPriceInput = document.getElementById('editPrice');
    const editImageInput = document.getElementById('editImage');
    const editForm = document.getElementById('editForm');

    // if the item has information populate the edit form places to answer
    if (item) {
        editNameInput.value = item.name;
        editDescriptionInput.value = item.description;
        editPriceInput.value = item.price;
        editImageInput.value = item.url;
        // setting the attribute to the items id
        editForm.setAttribute('data-index', item.id);
    }
  //  style to display the edit form
    editForm.style.display = 'block';
}

// whenever the save button is clicked it checks the id of the edit form for the index of the button
document.getElementById('saveEdit').addEventListener('click', function () {
    const rowIndex = document.getElementById('editForm').getAttribute('data-index');
    
    // if the index of the row is not a valid answer there will be an error in the console log and returns
    if (rowIndex === null) {
        console.error("Invalid row index");
        return;
    }

    // the declared variable finds the index in the array by the id
    // by selecting the element by id 
    // updating the item with values from the inputs of the edit form
    const selectedItem = accessories.find(item => item.id == rowIndex);
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
  // when this button is clicked the form closes without saving any changes
    closeEditForm();
});

// Event listener for the "Save" button in the edit form
document.getElementById('saveEdit').addEventListener('click', function () {
  // when this button is clicked it checks the index of the product edited
    const rowIndex = document.getElementById


    // Logs an error if an invalid answer is given and returns
    if (rowIndex === null) {
        console.error("Invalid row index");
        return;
    }

    // checks the id of the product in the array being edited
    // shows the changes made in that selected index on the form
    const selectedItem = accessories.find(item => item.id == rowIndex);
    selectedItem.name = document.getElementById('editName').value;
    selectedItem.description = document.getElementById('editDescription').value;
    selectedItem.price = parseFloat(document.getElementById('editPrice').value);
    selectedItem.url = document.getElementById('editImage').value;

    // Update the table to add the edited information and close the edit form
    SHANK();
    // closes the edit form after changes made are saved
    closeEditForm();

  const editNameInput = document.getElementById("editName");
  const editDescriptionInput = document.getElementById("editDescription");
  const editPriceInput = document.getElementById("editPrice");
  const editImageInput = document.getElementById("editImage");
  const editForm = document.getElementById("editForm");

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

  // Update the table and close the edit form
  SHANK();
  closeEditForm();

});

// Event listener for the Cancel button in the edit form
document.getElementById("cancelEdit").addEventListener("click", function () {
  // Close the edit form without saving changes
  closeEditForm();
});


//when the dom content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // function to add a product
    function addProduct() {

        // Update array in local storage
        store();
        // call the function to see the updated table with the products
        SHANK();

        // Close the add product modal once a new product is added
        closeAddProductModal();
    }

    // when the button is clicked the add product function is triggered
    document.getElementById('addProductButton').addEventListener('click', addProduct);

//function to add product
document.addEventListener("DOMContentLoaded", function () {
  function addProduct() {
    // Update storage and display
    store();
    SHANK();

    // Close the add product modal
    closeAddProductModal();
  }

  // combine the addProduct function to a button or an event listener
  document
    .getElementById("addProductButton")
    .addEventListener("click", addProduct);

});

// Function to close the edit form modal
function closeEditForm() {

  // getting the edit form by its id
    const editForm = document.getElementById('editForm');
    editForm.style.display = 'none';

  const editForm = document.getElementById("editForm");
  editForm.style.display = "none";

}

// Function to close the add product modal
function closeAddProductModal() {

  // getting the add product modal by its id
    document.getElementById('addProductModal').style.display = 'none';
}

// when the dom content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    function addProduct() {
      // get  input elements for the new product
        const newName = document.getElementById('newName');
        const newImg = document.getElementById('newImg');
        const newDes = document.getElementById('newDes');
        const newPrice = document.getElementById('newPrice');
        // getting element to display result
        const resultElement = document.getElementById('result');

        // Clear previous result
        resultElement.innerHTML = "";

        //prevent default submitting
        event.preventDefault();

        // if empty an alert will pop up to put in the information needed 
        if (newName.value === '' || newImg.value === '' || newDes.value === '' || newPrice.value === '') {
            alert('Please fill in all fields to add a new product!');
        } else { // a new product will be added to the array in the required inputs
            accessories.push(new Item(
                accessories.length + 1,
                newName.value,
                newDes.value,
                parseFloat(newPrice.value),
                newImg.value
            ));

            // Clear input fields after a new product was added
            newName.value = '';
            newImg.value = '';
            newDes.value = '';
            newPrice.value = '';

            // Update storage of the array and display on the html
            store();
            SHANK();
        }

  document.getElementById("addProductModal").style.display = "none";
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

      // Update storage and display
      store();
      SHANK();

    }
  }

  // combine the addProduct function to a button or an event listener
  document
    .getElementById("addProductButton")
    .addEventListener("click", addProduct);
});


// when the dom content is fully loaded 
document.addEventListener('DOMContentLoaded', function () {
    function addProduct() {
      // getting the input elements for the new product information
        const newName = document.getElementById('newName');
        const newImg = document.getElementById('newImg');
        const newDes = document.getElementById('newDes');
        const newPrice = document.getElementById('newPrice');
        // element to display result
        const resultElement = document.getElementById('result');
        const spinner = document.getElementById('spinner');

        // Show the spinner
        spinner.style.display = 'block';

        // Clear previous results
        resultElement.innerHTML = "";

        // prevent default submitting
        event.preventDefault();

        // return an element if an imput is not found
        if (!newName || !newImg || !newDes || !newPrice) {
            console.error('One or more input elements not found.');
            return;
        }

        // if a new product is added an alert will show
        if (newName.value === '' || newImg.value === '' || newDes.value === '' || newPrice.value === '') {
            alert('You have added a new product!');
        } else {
            // Simulating an asynchronous operation (
            setTimeout(function () {
                accessories.push(new Item(
                    accessories.length + 1,
                    newName.value,
                    newDes.value,
                    parseFloat(newPrice.value),
                    newImg.value
                ));

                // Clear input fields
                newName.value = '';
                newImg.value = '';
                newDes.value = '';
                newPrice.value = '';

                // Update storage and display
                store();
                SHANK();

                // Hide the spinner after 5 seconds
                setTimeout(function () {
                    spinner.style.display = 'none';
                }, 5000);
            }, 1000); // Simulating a delay of 1 second 
        }

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
          spinner.style.display = "none";
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
