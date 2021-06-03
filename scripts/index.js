const content = document.getElementById('content')

function productList(teddies) {
  for (teddy of teddies) {

    const listDiv = document.createElement('div')
    listDiv.setAttribute('id', 'listDiv')

    const teddyName = document.createElement('h2')
    teddyName.setAttribute('id', 'name')

    const teddyPrice = document.createElement('h3')
    teddyPrice.setAttribute('id', 'price')

    const teddyBtn = document.createElement('button')
    teddyBtn.setAttribute('onclick', `window.location.href="produit.html?_id=${teddy._id}"`)

    teddyName.textContent = `${teddy.name}`
    teddyPrice.textContent = `${teddy.price / 100} €`
    teddyBtn.innerHTML += `Voir le produit`

    content.append(listDiv)
    listDiv.append(teddyName, teddyPrice, teddyBtn)
  }
}

async function retrieveteddies() {
  await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json())
    .then((teddies) => productList(teddies))
}

retrieveteddies()
