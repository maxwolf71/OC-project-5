const cart = document.getElementById('cart')

// Cart item/s ********************
let cartItem = document.createElement('h1')

cartItem.textContent = localStorage.getItem('name') + ' ' 
+ localStorage.getItem('color') + ' ' + localStorage.getItem('price') + '€'

cart.appendChild(cartItem)

// item/s quantity ********************
let qtyItem = document.createElement('input')
qtyItem.setAttribute('type', 'number') 
qtyItem.setAttribute('id', 'qtyNumber') 
qtyItem.setAttribute('value', '1') 
cart.appendChild(qtyItem)

// total price ********************

let price = localStorage.getItem('price')
let total = document.createElement('h1')
total.textContent = 'Total : 0 €'
cart.appendChild(total)
qtyItem.addEventListener('mouseout', function() {
    let totalPrice = document.getElementById('qtyNumber').value * price;
    total.textContent = `Total : ${totalPrice} €`
})

// remove item from cart ********************
let btnRemove = document.createElement('button')
btnRemove.innerHTML += '<button id="btnRemove">X</button>'
cart.appendChild(btnRemove)

btnRemove.addEventListener('click', function() {
    localStorage.clear()
    cartItem.textContent = 'Votre panier est vide'
    total.textContent = 'Total : 0 €'
})
console.log(localStorage)