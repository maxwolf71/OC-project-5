const productCard = document.getElementById('product')

function getTeddyId() {
  const pageLink = window.location.search
  const urlParams = new URLSearchParams(pageLink)
  const teddyId = urlParams.get('_id')
  return teddyId
}

async function retrieveTeddy(teddyId) {
  await fetch(`http://localhost:3000/api/teddies/${teddyId}`)
    .then((response) => response.json())
    .then((teddyInfo) => {

      function displayTeddyInfo() {
        const teddyName = document.createElement('h2')
        teddyName.setAttribute('id', 'name')
        const teddyPrice = document.createElement('h3')
        teddyPrice.setAttribute('id', 'price')
        const teddyDescription = document.createElement('p')

        const teddyImage = document.createElement('img')
        teddyImage.src = `${teddyInfo.imageUrl}`

        teddyName.textContent = `${teddyInfo.name}`
        teddyPrice.textContent = `${teddyInfo.price / 100} €`
        teddyDescription.textContent = `${teddyInfo.description}`

        productCard.append(teddyName, teddyPrice, teddyImage, teddyDescription)
      }
      displayTeddyInfo()

      // Get color list + selected color   ************ 
      function getColors() {
        const colors = teddyInfo.colors
        for (color of colors) {
          const selectColor = document.getElementById('selectColor')

          let option = document.createElement('option')
          option.textContent = `${color}`

          selectColor.appendChild(option)
        }
      }
      getColors()

      // Click Cart button   ************ 
      document.getElementById("btnAddToCart").onclick = function () { popup() }

      function addTeddyCart() {
        const teddy = {
          id: `${teddyId}`,
          name: `${teddyInfo.name}`,
          price: `${teddyInfo.price}`,
          color: `${document.getElementById('selectColor').value}`
        }
        let cart = localStorage.getItem('localCart')
        cart = JSON.parse(cart)
        cart.push(teddy)
        localStorage.setItem('localCart', JSON.stringify(cart))
      }

      function popup() {
        if (confirm(`Ajouter ${teddyInfo.name} (${document.getElementById('selectColor').value}) au panier ?`)) {
          location.href = 'panier.html'
          addTeddyCart()
        }
      }
    })
}

async function main() {
  const teddyId = await getTeddyId()
  retrieveTeddy(teddyId)
}
main()

