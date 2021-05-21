const cart = document.getElementById('cart')

// Create (html elements) + display cart items ************ 

let cartItem = document.createElement('h1')
let cartImage = document.createElement('img')
console.log(cartImage)

let teddyName = localStorage.getItem('name')
let teddyPrice = localStorage.getItem('price')
let teddyColor = localStorage.getItem('color')
let teddyImage = localStorage.getItem('image')

cartItem.textContent = teddyName + ' ' 
+ teddyColor + ' ' + teddyPrice + '€'

cart.appendChild(cartItem)

// item/s quantity ********************
let qtyItem = document.createElement('input')
qtyItem.setAttribute('type', 'number') 
qtyItem.setAttribute('id', 'qtyNumber') 
qtyItem.setAttribute('value', '1') 
cart.appendChild(qtyItem)

// buttton -> remove item from cart ********************
let btnRemove = document.createElement('button')
btnRemove.setAttribute('id', 'btnRemove')
btnRemove.textContent = 'X'
cart.appendChild(btnRemove)

// remove item from cart ********************
btnRemove.addEventListener('click', function() {
    cart.remove()
    localStorage.clear()
    updateCartTotal()
})
function updateCartTotal() {
     
}

if(teddyPrice === null) {
    cartItem.textContent = 'Panier vide'
    qtyItem.remove()
    btnRemove.remove()
}
// total price ********************

let totalPrice = document.createElement('h2')
totalPrice.setAttribute('id', 'totalPrice')
totalPrice.textContent = `Total : ${teddyPrice} €`
if(teddyPrice === null) {
    totalPrice.textContent = ''
}
cart.appendChild(totalPrice)

qtyItem.addEventListener('click', function() {
    let finalPrice = document.getElementById('qtyNumber').value * teddyPrice;
    totalPrice.textContent = `Total : ${finalPrice} €` 
})