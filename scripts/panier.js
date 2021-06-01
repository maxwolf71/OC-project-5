const cartDiv = document.getElementById('cartDiv')

function setEmptyCart() {
    localStorage.clear()
    localStorage.setItem('localCart', JSON.stringify([]))
    document.location.reload()
}

function designateQuantity() {
    let qtyInput = document.createElement('input')
    qtyInput.setAttribute('type', 'number')
    qtyInput.setAttribute('id', 'qtyInput')
    qtyInput.setAttribute('value', '1')
    cartDiv.appendChild(qtyInput)
}

function totalCart() {
    let totalPrice = document.createElement('div')
    totalPrice.setAttribute('id', 'totalPrice')
    totalPrice.textContent = `Total : ${cartItem.price} €`

    cartDiv.appendChild(totalPrice)

    qtyInput.addEventListener('click', function () {
        let finalPrice = document.getElementById('qtyInput').value * `${cartItem.price}`
            totalPrice.textContent = `Total : ${finalPrice} €`
    })
}

function cartDisplay() {
    const cart = localStorage.getItem('localCart')

    if (cart === '[]') {
        document.getElementById('cartDiv').innerHTML = '<h1>Panier vide</h1>'
    } 
    else {
        let cartItems = JSON.parse(localStorage.getItem('localCart'))
        
        for (cartItem of cartItems) {
            document.getElementById('cartDiv').innerHTML += `
            <h1>${cartItem.name}</h1>
            <h4>(${cartItem.color})</h4>
            <h2>${cartItem.price}€</h2>
        `
        designateQuantity()
        totalCart()
            
        }    
    }
}
cartDisplay()
