const cartDiv = document.getElementById('cartDiv')

function resetEmptyCart() {
    localStorage.clear()
    localStorage.setItem('localCart', JSON.stringify([]))
    document.location.reload()
}

function totalCart() {
    const prices = JSON.parse(localStorage.getItem('localCart'))

    let total = 0
    for (price of prices) {
        total = total + price.price / 100
    }
    cartDiv.innerHTML += `<h2 id="totalPrice">Total : ${total} €</h2>`
    localStorage.setItem('total', JSON.stringify(total))
}

function cartDisplay() {
    const cart = localStorage.getItem('localCart')

    if (cart === '[]') {
        document.getElementById('cartDiv').innerHTML = '<h1 id="empty">Panier vide</h1>'
        document.getElementById('orderForm').innerHTML = ''
    }
    else {
        let cartItems = JSON.parse(localStorage.getItem('localCart'))

        for (cartItem of cartItems) {
            document.getElementById('cartItem').innerHTML += `
            <div id="container">
            <h1 id="name">${cartItem.name}</h1>
            <h2 id="color">(${cartItem.color})</h2>
            <h3 id="price">${cartItem.price / 100} €</h3>
            </div>
        `
        }
        totalCart()
    }
}
cartDisplay()

// Contact form ***********************************************************

const orderForm = document.getElementById('orderForm')
const submitFormBtn = document.getElementById('submitFormBtn')

function validate() {
    const firstName = document.getElementById('firstName')
    const lastName = document.getElementById('lastName')
    const address = document.getElementById('address')
    const city = document.getElementById('city')
    const email = document.getElementById('email')

    if (firstName.value.length < 3 || lastName.value.length < 3 || address.value.length < 6 || city.value.length < 3) {
        alert('Formulaire non complété')
        firstName.style.border = "4px solid red"

        return false
    }
    else {
        localStorage.removeItem('localCart')
        orderForm.reset()
    }
}

function postRequest() {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "contact": {
                firstName: `${firstName}`,
                lastName: `${lastName}`,
                email: `${email}`,
                address: `${address}`,
                city: `${city}`
            },
            "products": [
                cartItem.id
            ]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/api/teddies/order", requestOptions)
        .then(response => response.text())
        .then(result => 
            // add orderId to localStorage
            localStorage.setItem('orderId', `${JSON.parse(result).orderId}`),
            localStorage.setItem('lastName', `${lastName.value}`),
            localStorage.setItem('firstName', `${firstName.value}`)
        )
        .catch(error => console.log('error', error))
}
postRequest()