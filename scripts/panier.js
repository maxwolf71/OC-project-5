const cartDiv = document.getElementById('cartDiv')

function setEmptyCart() {
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
}

function cartDisplay() {
    const cart = localStorage.getItem('localCart')

    if (cart === '[]') {
        document.getElementById('cartDiv').innerHTML = '<h1 id="empty">Panier vide</h1>'
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

let fields = {}

document.addEventListener("DOMContentLoaded", function () {
    fields.firstName = document.getElementById('firstName')
    fields.lastName = document.getElementById('lastName')
    fields.address = document.getElementById('address')
    fields.zipCode = document.getElementById('zipCode')
    fields.email = document.getElementById('email')
})

function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined') return false
    return (value.length > 0)
}

function isNumber(num) {
    return (num.length > 0) && !isNaN(num)
}

function fieldValidation(field, validationFunction) {
    if (field == null) return false;

    let isFieldValid = validationFunction(field.value)
    if (!isFieldValid) {
        field.className = 'placeholderRed';
    } else {
        field.className = '';
    }

    return isFieldValid;
}

function isValid() {
    var valid = true;

    valid &= fieldValidation(fields.firstName, isNotEmpty)
    valid &= fieldValidation(fields.lastName, isNotEmpty)
    valid &= fieldValidation(fields.address, isNotEmpty)
    valid &= fieldValidation(fields.zipCode, isNumber)
    valid &= fieldValidation(fields.email, isEmail)

    return valid;
}

function isEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(orderForm.email.value)) {
        return (true)
    }
    alert("Veuillez saisir un adresse mail valide !")
    return (false)
}

class User {
    constructor(firstName, lastName, address, email, zipCode) {
        this.lastName = lastName
        this.firstName = firstName
        this.address = address
        this.email = email
        this.zipCode = zipCode
    }
}

function submitOrder() {
    if (isValid()) {
        let usr = new User(firstName.value, lastName.value, email.value, address.value, zipCode.value)

        alert(`${usr.firstName} merci pour votre commande !`)
    } else {
        alert("Merci de renseigner tous les champs")
    } 
}