import { menuArray } from '/data.js';

const itemDetails = document.getElementById("items-list");
const addItem = document.getElementById(`items-list`);
const orderDetais = document.getElementById('order-details');
const orderItems = document.getElementById('order-items');
const completeOrderBtn = document.getElementById("complete-order-btn");

let shoppingList = [];

addItem.addEventListener("click", function(event) {
    if (event.target.id) {
        if (addItem.querySelector(`i#${event.target.id}`)) {
            addToBasket(event.target.id);
        }
        else {
            console.error("Error: Id found but, not associated to any of our products tags.");
        }
    }
    else {
        console.error("Error: user clicked on an empty space.");
    }
})


orderItems.addEventListener("click", e => {

    if (e.target.id) {
        if (orderItems.querySelector(`p#${e.target.id}`)) {
            const parentContainerText = orderItems.querySelector(`p#${e.target.id}`).parentElement.firstChild.nodeValue.trim();
            removeFromBasket(parentContainerText);
        }
        else {
            console.error("Error: Id found but, not associated to any of our products tags.");
        }
    }
    else {
        console.error("Error: user clicked on an empty space.");
    }
})

completeOrderBtn.addEventListener("click", function() {
    
})


function addToBasket(item) {
    orderDetais.style.display = "block";
    shoppingList.push(item);
    
    update();
}

function removeFromBasket(itemId) {
    console.log("item Id: " + itemId);
    const indexToRemove = shoppingList.indexOf(itemId);
    console.log("Index is at: " + indexToRemove);
    shoppingList.splice(indexToRemove, 1);
    console.log("After removal: "+ shoppingList);
    update();
}

function update() {
    const copyArray = shoppingList.slice();
    const filteredShoppingListSet = new Set(copyArray);
    const filteredShoppingListArray = [...filteredShoppingListSet];
    let totalPrice = 0;

    const itemAmount = shoppingList.reduce(function(object, i){
            if (object[i]) {
                object[i]++;
            }
            else {
                object[i] = 1;
            }
            return object;
        }, {});
    

    let html = ``;
    filteredShoppingListArray.forEach(function(shoppingListItem) {
    
        let itemPrice = 0;
        menuArray.forEach(function(product) {
            if (product.name === shoppingListItem) {
                itemPrice = itemAmount[shoppingListItem] * product.price;
            }
        })
        html += `
            <div class="items-selected" id="${shoppingListItem}-selected">
                <div class="item-title" id="${shoppingListItem}-title">${shoppingListItem}
                    <p class="item-amount" id="${shoppingListItem}-amount">x${itemAmount[shoppingListItem]}</p>
                    <p class="remove-item" id="remove-${shoppingListItem}">remove</p>   
                    <p class="individual-item-price" id="${shoppingListItem}-price">$${itemPrice}</p>
                </div>
            </div>
        `;
        totalPrice += itemPrice;
    });
    

    let totalPriceHtml = 
    `
        <div class="total-price" id="total-price">
            <p class="total-price-text">Total price:</p>
            <p class="total-price-amount" id="total-price-amount">
                $${totalPrice}
            </p>
        </div>
    `
    orderItems.innerHTML = html + totalPriceHtml;
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
