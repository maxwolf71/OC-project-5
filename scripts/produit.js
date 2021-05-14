const product = document.getElementById('product')

const params = new URLSearchParams(window.location.search)
const getTeddyId = params.get('_id')

function teddyId(teddies) {
  for(teddy of teddies) {
    if(getTeddyId === teddy._id) {
      // image ************
      const image = document.createElement('img')
      document.getElementById('product').appendChild(image)
      image.src =  `${teddy.imageUrl}`
      // nom, description et prix ************
      product.innerHTML += `
      <h1 id="name">${teddy.name}</h1>
      <p id="description">${teddy.description}</p>
      <p id="price">${teddy.price/100}€</p>
      `
      // couleurs***********
      colors = teddy.colors
      for(color of colors) {
        const getList = document.getElementById('selectColor')

        let newListItem = document.createElement('option')
        newListItem.textContent = `${color}`

        getList.appendChild(newListItem)
      }
      
    }
  }
}
async function retrieveTeddies() {
  await fetch('https://oc-p5-api.herokuapp.com/api/teddies')
  .then((response) => response.json())
  .then((teddies) => teddyId(teddies))
}

retrieveTeddies()

document.getElementById('btnCart').addEventListener('click', addToCart)

console.log(document.getElementById('btnCart'))

function addToCart() {
  alert('test')
}
