const content = document.querySelector('.content')

function productList(products) {
  products.forEach(item => {
    content.innerHTML += `<h1 id="name">${item.name}</h1><p id="price">
    ${item.price/100} €</p><button><a href="/pages/produit.html?_id=${item._id}">Voir le produit</a></button>`
  }) 
}

async function retrieveProducts() {
  await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json()) 
    .then((products) => productList(products))
}

retrieveProducts()




//**********************************************************

const product = document.querySelector('.product')

const params = new URLSearchParams(window.location.search)
const result = params.get('_id')

function teddyId(teddies) {
  for(let teddy of teddies) {
    if(result ===  teddy._id) {
      product.innerHTML += `<h1>${teddy.name}</h1> <p>${teddy.price/100}€</p>${teddy.description}${teddy.imageUrl}`
    }
  }
}

async function retrieveTeddies() {
  await fetch('http://localhost:3000/api/teddies')
  .then((response) => response.json())
  .then((teddies) => teddyId(teddies))
}

retrieveTeddies()






