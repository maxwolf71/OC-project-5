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

cartDisplay()

function setEmptyCart() {
    localStorage.clear()
    localStorage.setItem('localCart', JSON.stringify([]))
    document.location.reload()
}

function cartDisplay() {
    const cart = localStorage.getItem('localCart')
    if (cart === '[]') {
        document.getElementById('cartDiv').innerHTML += '<h1>Panier vide</h1>'
    }
    else {
        let cartItems = JSON.parse(localStorage.getItem('localCart'))
        for (cartItem of cartItems) {
            document.getElementById('cartDiv').innerHTML += `
            <h1>${cartItem.name}</h1>
            <h2>${cartItem.price} €--</h2>
            <h3>(${cartItem.color})</h3>  
        `
        }
    }
}

