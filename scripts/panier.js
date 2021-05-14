const cart = document.getElementById('cart')
let cartItem = document.createElement('h1')
document.getElementById("cart").innerHTML = localStorage.getItem('name') + ' ' + localStorage.getItem('price')

cart.appendChild(cartItem)

