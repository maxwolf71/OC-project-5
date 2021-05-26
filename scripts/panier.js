/*const cart = document.getElementById('cart')
// Create (html elements) ************ 
let cartItem = document.createElement('h1')
let cartImage = document.createElement('img')
cartImage.src = localStorage.getItem('image')

// Retrieve from products to localStorage ************
let teddyName = localStorage.getItem('name')
let teddyPrice = localStorage.getItem('price')
let teddyColor = localStorage.getItem('color')

if(!teddyName) {
    cartItem.textContent = 'Panier vide'
    return
}

// Display cart items ************
cartItem.textContent = teddyName + ' ' + teddyColor + ' ' + teddyPrice + '€'

cart.append(cartImage, cartItem)

// item/s quantity ********************
let qtyItem = document.createElement('input')
qtyItem.setAttribute('type', 'number') 
qtyItem.setAttribute('id', 'qtyNumber') 
qtyItem.setAttribute('value', '1') 
cart.appendChild(qtyItem)

// Button -> empty cart ********************
let emptyCart = document.createElement('button')
emptyCart.setAttribute('id', 'emptyCart')
emptyCart.textContent = 'Vider le panier'
cart.appendChild(emptyCart)

// Click button -> empty cart ********************
emptyCart.addEventListener('click', function() {
    cartItem.textContent = 'Panier vide'
    cartImage.remove()
    qtyItem.remove()
    emptyCart.remove()
    totalPrice.remove()
    localStorage.clear()
})

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
*/

function createCart() {
    localStorage.setItem('panier', JSON.stringify([]))
}
function emptyCart() {
    localStorage.clear()
}
function addTeddyCart() {
    const teddy = {
        id: localStorage.getItem('id'),
        color: localStorage.getItem('color')
    }
    let cart = localStorage.getItem('panier')
    cart = JSON.parse(cart)
    cart.push(teddy)
    localStorage.setItem('panier', JSON.stringify(cart))
}
