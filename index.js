import { menuArray } from '/data.js';

const itemDetails = document.getElementById("items-list");
const addItem = document.getElementById(`items-list`);

addItem.addEventListener("click", function(event) {
    addToBasket(event.target.id);
})

function addToBasket(id) {
    console.log(id);

    let html = `
        <div>
            <h2 class="order-title" id="order-title"></h2>
            <section class="items-selected" id="items-selected"></section>
            <p class="total-price" id="total-price">Total price:
                <span>$${total-price}</span>
            </p>
        </div>
    `
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
                <p class="item-price">$${item.price}</p>
            </div>
            <i class="fa-solid fa-plus" id="add-${item.name}"></i>
        </div>
        <div class="items-border"></div>
    `

    itemDetails.innerHTML = html;
    });
}

render();
