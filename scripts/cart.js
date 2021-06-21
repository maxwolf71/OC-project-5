// retrieve html element for displaying
const cartMainContainer = document.getElementById('cartMainContainer')

// clear localStorage + reset cartContent (refresh page)
function resetEmptyCart() {
    localStorage.clear()
    document.location.reload()
    localStorage.setItem('cartContent', '[]')
}
// sum of all products in cart
function totalCart() {
    // retrieve html element for loop
    const prices = JSON.parse(localStorage.getItem('cartContent'))

    let total = 0
    for (price of prices) {
        total += price.price / 100
    }
    // display result in html *
    cartMainContainer.innerHTML += `<h2 id="totalPrice">Total : ${total} €</h2>`
    // add to localStorage for later use (confirm.js)
    localStorage.setItem('total', JSON.stringify(total))
}

function cartDisplay() {
    // create cartContent in localStorage
    const cartContent = localStorage.getItem('cartContent')
    // if cartContent array is empty or doesn't exist
    if (cartContent === '[]' || cartContent === null) {
        // display "Panier vide"
        document.getElementById('cartMainContainer').innerHTML = '<h1 id="empty">Panier vide</h1>'
        // display nothing
        document.getElementById('orderForm').innerHTML = ''
        // hide this
        emptyCartContainer.classList.add('hidden')
    }
    else {
        // create cartItems in localStorage
        let cartItems = JSON.parse(localStorage.getItem('cartContent'))
        // display html for each item
        for (cartItem of cartItems) {
            document.getElementById('cart').innerHTML += `
            <div id="item">
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

// retrieve html elements
const orderForm = document.getElementById('orderForm')

const firstNameInput = document.getElementById('firstName')
const lastNameInput = document.getElementById('lastName')
const addressInput = document.getElementById('address')
const cityInput = document.getElementById('city')
const emailInput = document.getElementById('email')

// create inputs array
const inputs = [
    firstNameInput,
    lastNameInput,
    addressInput,
    cityInput,
    emailInput
]
// create event on submit of the form
orderForm.addEventListener('submit', (event) => {
    // prevent form from submitting
    event.preventDefault()
    // verify form data is ok
    validate()
    if (isFormValid) {
        // if form is ok do the post request to send data to server + confirm final order
        postRequest()
    }
})

let isFormValid = false

function validate() {
    isFormValid = true
    resetInputs(firstNameInput)
    resetInputs(lastNameInput)
    resetInputs(addressInput)
    resetInputs(cityInput)
    resetInputs(emailInput)

    if (!firstNameInput.value) {
        isFormValid = false
        invalidate(firstNameInput)
    }
    if (!lastNameInput.value) {
        isFormValid = false
        invalidate(lastNameInput)
    }
    if (!addressInput.value) {
        isFormValid = false
        invalidate(addressInput)
    }
    if (!cityInput.value) {
        isFormValid = false
        invalidate(cityInput)
    }
    if (!isEmail(emailInput.value)) {
        isFormValid = false
        invalidate(emailInput)
    }
}
// reset Inputs when correct value entered
function resetInputs(elem) {
    elem.classList.remove('invalid')
    elem.nextElementSibling.classList.add('hidden')
}
// if input is not valid
function invalidate(elem) {
    elem.classList.add('invalid')
    elem.nextElementSibling.classList.remove('hidden')
}
// if inputs valid execute validate()
inputs.forEach(input => {
    input.addEventListener('input', () => {
        validate()
    })
})

// validate email under certain conditions
function isEmail() {
    let regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
    return regexEmail.test(emailInput.value)
}
//validate all other fields under certain conditions
function isValid(elem) {
    let regex = /^[a-zA-Z_.+-]+$/
    return regex.test(elem.value)
}

// Post request   ***************************************************

async function postRequest() {
    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    let products = []
    let items = JSON.parse(localStorage.getItem('cartContent'))

    for (item of items) {
        products.push(item.id)
    }

    let raw = JSON.stringify({
        contact: {
            firstName: `${firstName}`,
            lastName: `${lastName}`,
            email: `${email}`,
            address: `${address}`,
            city: `${city}`
        },
        products:
            products
    })

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    await fetch("http://localhost:3000/api/teddies/order", requestOptions)
        .then(response => response.text())
        .then(result =>
            localStorage.setItem('orderId', `${JSON.parse(result).orderId}`),
            localStorage.setItem('firstName', firstNameInput.value),
            localStorage.setItem('lastName', lastNameInput.value),
        )
        .catch(error => console.log('error', error))
    location.href = 'confirm.html'
}
