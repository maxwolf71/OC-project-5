const cart = document.getElementById('cart')

let cartItem = document.createElement('h1')

cartItem.textContent = localStorage.getItem('name') + ' ' 
+ localStorage.getItem('color') + ' ' + localStorage.getItem('price')

cart.appendChild(cartItem)

// remove item from cart ********************
const btnRemoveItem = document.getElementById('btnRemoveItem')

let cartText = cartItem.textContent
console.log(cartText)
btnRemoveItem.addEventListener('click', function() {
    cartItem.remove()
    localStorage.clear()  
})