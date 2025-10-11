import { menuArray } from '/data.js';

const itemDetails = document.getElementById("items-list");
const addItem = document.getElementById(`items-list`);
const orderDetails = document.getElementById('order-details');
let shoppingList = [];

addItem.addEventListener("click", function(event) {
    if (event.target.id) {
        if (addItem.querySelector(`i#${event.target.id}`)) {
            addToBasket(event.target.id, `${event.target.id}-price`);
        }
        else {
            console.error("Error: Id found but, not associated to any of our products tags.");
        }
    }
    else {
        console.error("Error: user clicked on an empty space.");
    }
})

function addToBasket(item, price) {
    let itemPrice = document.getElementById(`${price}`).textContent;
    shoppingList.push(item);

    const itemAmount = shoppingList.reduce(function(total, i){
        if (i === item) {
            return total + 1;
        }
        return total;
    }, 0);

    const copyArray = shoppingList.slice();
    const filteredShoppingListSet = new Set(copyArray);
    const filteredShoppingListArray = [...filteredShoppingListSet];

    const html = filteredShoppingListArray.map(function(item){
        return `
            <div class="items-selected" id="items-selected">
                <h2 class="order-title" id="order-title">${item}</h2>
                <span class="item-amount" id="item-amount">${itemAmount}</span>
                <span class="remove-item" id="remove-item">remove</span>   
                <span class="item-price" id="item-price">${itemPrice}</span>
            </div>
        `;
    }).join('');
    
    let totalPriceHtml = 
    `
        <section class="total-price" id="total-price">
            <p class="total-price-text">Total price: 
                <span class="total-price-amount" id="total-price-amount">
                    $
                </span>
            </p>
        </section>
    `
    orderDetails.innerHTML = html;
}

function render() {
    let html = ``;
    menuArray.forEach(function(item) {
        html += `
        <div class="flex">
            <p class="item-emoji">${item.emoji}</p>
            <div class="wrapper">
                <p class="item-name">${item.name}</p>
                <p class="item-ingredients">${item.ingredients.join(', ')}</p>
                <p class="item-price" id="${item.name}-price">$${item.price}</p>
            </div>
            <i class="fa-solid fa-plus" id="${item.name}"></i>
        </div>
        <div class="items-border"></div>
    `

    itemDetails.innerHTML = html;
    });
}

render();
