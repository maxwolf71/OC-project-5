const product = document.getElementById('product')

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
        const teddyName = document.createElement('h1')
        const teddyPrice = document.createElement('h2')
        const teddyDescription = document.createElement('p')

        const teddyImage = document.createElement('img')
        teddyImage.src = `${teddyInfo.imageUrl}`

        teddyName.textContent = `${teddyInfo.name}`
        teddyPrice.textContent = `${teddyInfo.price / 100} €`
        teddyDescription.textContent = `${teddyInfo.description}`

        product.append(teddyName, teddyPrice, teddyImage, teddyDescription)
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
      document.getElementById("btnAddToCart").onclick = function() {addTeddyCart(), pop()}

      function addTeddyCart() {
        const teddy = {
          name: `${teddyInfo.name}`,
          price: ` ${teddyInfo.price /100}`,
          color: `${document.getElementById('selectColor').value}`
        }
        let cart = localStorage.getItem('localCart')
        cart = JSON.parse(cart)
        cart.push(teddy)
        localStorage.setItem('localCart', JSON.stringify(cart))
      }
      function pop() {
        if(confirm("Confirmer la mise au panier")) {
         location.href = 'panier.html'
        }
      }

    })
}
async function main() {
  const teddyId = await getTeddyId()
  retrieveTeddy(teddyId)
}
main()

function popup() {
    if (window.confirm("Do you really want to leave?")) {
    window.open("panier.html", "Thanks for Visiting!");
    }
}
