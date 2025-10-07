import { menuArray } from '/data.js';

const orderDetails = document.getElementById("order-details");
let html = ``;
menuArray.forEach(function(item) {
    console.log(item.ingredients);

    html += `
    <div class="flex item-line">
        <p class="item-emoji">${item.emoji}</p>
        <div class="wrapper">
            <p class="item-name">${item.name}</p>
            <p class="item-ingredients">${item.ingredients.join(', ')}</p>
            <p class="item-price">$${item.price}</p>
        </div>
    </div>

`
orderDetails.innerHTML = html;
});