const cartMainContainer = document.getElementById('cartMainContainer')

function resetEmptyCart() {
    localStorage.clear()
    document.location.reload()
}

function totalCart() {
    const prices = JSON.parse(localStorage.getItem('cartContent'))

    let total = 0
    for (price of prices) {
        total += price.price / 100
    }
    cartMainContainer.innerHTML += `<h2 id="totalPrice">Total : ${total} €</h2>`
    localStorage.setItem('total', JSON.stringify(total))
}

function cartDisplay() {
    const cartContent = localStorage.getItem('cartContent')

    if (cartContent=== '[]' || cartContent=== null) {
        document.getElementById('cartMainContainer').innerHTML = '<h1 id="empty">Panier vide</h1>'
        document.getElementById('orderForm').innerHTML = ''
        emptyCartContainer.classList.add('hidden')
    }
    else {
        let cartItems = JSON.parse(localStorage.getItem('cartContent'))

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

// grab elements
const orderForm = document.getElementById('orderForm')

const firstNameInput = document.getElementById('firstName')
const lastNameInput = document.getElementById('lastName')
const addressInput = document.getElementById('address')
const cityInput = document.getElementById('city')
const emailInput = document.getElementById('email')

const inputs = [
    firstNameInput,
    lastNameInput,
    addressInput,
    cityInput,
    emailInput
]

orderForm.addEventListener('submit', (event) => {
    event.preventDefault()
    validate()
    if (isFormValid) {
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
// reset Inputs
function resetInputs(elem) {
    elem.classList.remove('invalid')
    elem.nextElementSibling.classList.add('hidden')
}
// if input not valid
function invalidate(elem) {
    elem.classList.add('invalid')
    elem.nextElementSibling.classList.remove('hidden')
}
// clear error message on input
inputs.forEach(input => {
    input.addEventListener('input', () => {
        validate()
    })
})

// validate email
function isEmail() {
    let regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
    return regexEmail.test(emailInput.value)
}
//validate remaining
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
