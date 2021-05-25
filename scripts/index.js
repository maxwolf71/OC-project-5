const content = document.getElementById('content')

function productList(teddies) {
  for(teddy of teddies) {

    const teddyName = document.createElement('h1')
    const teddyPrice = document.createElement('h2')
    const teddyBtn = document.createElement('button')

    teddyName.textContent = `${teddy.name}`
    teddyPrice.textContent = `${teddy.price/100} € `
    teddyBtn.innerHTML = `<a href="/pages/produit.html?_id=${teddy._id}&name=${teddy.name}">Voir le produit</a>`

    content.append(teddyName, teddyPrice, teddyBtn)
  }
}

async function retrieveteddies() {
  await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json()) 
    .then((teddies) => productList(teddies))
}

retrieveteddies()
