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

const product = document.querySelector('.product')

function teddyDetails(products) {
  
}

async function retrieveTeddy() {
  await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json()) 
    .then((products) => teddyDetails(products))
}
retrieveTeddy()


