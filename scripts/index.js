const content = document.getElementById('content')

function productList(products) {
  for(elem of products) {
    content.innerHTML += `
    <h1 id="name">${elem.name}</h1>
    <p id="price">${elem.price/100} €</p>
    <button><a href="/pages/produit.html?_id=${elem._id}">Voir le produit</a></button>
    `
  }
}

async function retrieveProducts() {
  await fetch('https://oc-p5-api.herokuapp.com/api/teddies')
    .then((response) => response.json()) 
    .then((products) => productList(products))
}

retrieveProducts()
