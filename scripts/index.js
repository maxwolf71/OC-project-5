const content = document.querySelector('.content')

function ProductList(products) {
  products.forEach(item => {
    content.innerHTML += `<h1 id="name">${item.name}</h1><p id="price">
    ${item.price/100} €</p><button>Voir produit</button>`
  }) 
}

async function retrieveProducts() {
  await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json()) 
    .then((products) => ProductList(products))
}

retrieveProducts()

content.addEventListener('click', function() {
  content.innerHTML = `TEST`
})