// index.html
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

//produit.html**********************************

const product = document.querySelector('.product')

const params = new URLSearchParams(window.location.search)
const result = params.get('_id')

function teddyId(teddies) {
  for(teddy of teddies) {
    if(result ===  teddy._id) {
      const image = document.createElement('img')
      document.querySelector('.product').appendChild(image)
      image.src =  `${teddy.imageUrl}`

      product.innerHTML += `
      <h1 id="name">${teddy.name}</h1>
      <p id="description">${teddy.description}</p>
      <p id="price">${teddy.price/100}€</p>
      <select>
      <option value="">${teddy.colors[0]}</option>
      <option value="">${teddy.colors[1]}</option>
      <option value="">${teddy.colors[2]}</option>
      <option value="">${teddy.colors[3]}</option>
      </select>
      `
    }
  }
}
async function retrieveTeddies() {
  await fetch('https://oc-p5-api.herokuapp.com/api/teddies')
  .then((response) => response.json())
  .then((teddies) => teddyId(teddies))
}

retrieveTeddies()

//panier.html*********************************
