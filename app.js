//variables
const shoes = document.querySelector('#shoes-list');
const shoppingCartContent = document.querySelector('#cart-content tbody');
clearCartBtn = document.querySelector('#clear-cart');

//load event listeners
loadEventListeners();

function loadEventListeners() {
    //Adding a new shoe to the cart
    shoes.addEventListener('click', buyShoe);

    //delete shoes when the button is clicked
    shoppingCartContent.addEventListener('click', removeShoe);

    //clear the cart with the button
    clearCartBtn.addEventListener('click', clearCart);

    //Print data on screen when the screen loads
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}


//functions
function buyShoe(e) {
    e.preventDefault();


    //check if the clicked element contains the required class
    if (e.target.classList.contains('add-to-cart')) {
        const shoe = e.target.parentElement;

        //read the values
        getShoeInfo(shoe);
    }
}

//Display the selected shoes in the cart
function getShoeInfo(shoe) {
    //create an object with the shoe data
    const shoeInfo = {
        image: shoe.querySelector('img').src,
        title: shoe.querySelector('.title').textContent,
        price: shoe.querySelector('.price span').textContent,
        id: shoe.querySelector('button').getAttribute('data-id')
    }
    //Insert the card into the cart
    addIntoCart(shoeInfo);
}

//display selected courses in the shopping cart
function addIntoCart(shoe) {
    //create a row
    const row = document.createElement('tr');
    row.innerHTML = `
    <tr>
    <td>
         <img src="${shoe.image}" width=100>
    </td>

    <td>${shoe.title}</td>
    <td>${shoe.price}</td>
    <td>
        <a href="#" class="remove" data-id="${shoe.id}">X</a>
    </td>

    </tr>
    `;
    //Add the shoes into the shopping cart
    shoppingCartContent.appendChild(row);

    //Save to storage
    saveIntoStorage(shoe);

}
//save the selected items into local storage
function saveIntoStorage(shoe) {
    let shoes = getShoesFromStorage();

    //add shoes into the array
    shoes.push(shoe);

    //save intp localStorage
    localStorage.setItem('shoes', JSON.stringify(shoes));
}

//retrieve selected items from storage
function getShoesFromStorage() {
    let shoes;

    //get the value if present in the storage, else return an empty array
    if (localStorage.getItem('shoes') === null) {
        shoes = [];
    } else {
        shoes = JSON.parse(localStorage.getItem('shoes'));
    }
    return shoes;
}

//remove the shoes from the DOM
function removeShoe(e) {
    let shoe, shoeId;
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        shoe = e.target.parentElement.parentElement;
        shoeId = shoe.querySelector('a').getAttribute('data-id');
    }

    //remove from local storage
    removeShoeLocalStorage(shoeId);
}

function removeShoeLocalStorage(id) {
    //get the data from local storage
    let shoesLS = getShoesFromStorage();

    //loop through the array and find the index to delete
    shoesLS.forEach(function (shoeLS, index) {
        if (shoeLS.id === id) {
            shoesLS.splice(index, 1);
        }
    });

    //Add the result into the rest of the array
    localStorage.setItem('shoes', JSON.stringify(shoesLS));

}

//Clear cart with the  button
function clearCart() {
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    clearLocalStorage();
}

//clear the localStorage
function clearLocalStorage() {
    localStorage.clear();
}

//print data on screen when you load
function getFromLocalStorage() {
    let shoesLS = getShoesFromStorage();

    shoesLS.forEach(function (shoe) {
        //create a row
        const row = document.createElement('tr');
        row.innerHTML = `
    <tr>
    <td>
         <img src="${shoe.image}" width=100>
    </td>

    <td>${shoe.title}</td>
    <td>${shoe.price}</td>
    <td>
        <a href="#" class="remove" data-id="${shoe.id}">X</a>
       </td>

    </tr>
    `;
        //Add the shoes into the shopping cart
        shoppingCartContent.appendChild(row);

    })
}