// retrieve html element for displaying
const productCard = document.getElementById('product')
// get the id from the url transmitted by index.html
function getTeddyId() {
  const pageLink = window.location.search
  const urlParams = new URLSearchParams(pageLink)
  const teddyId = urlParams.get('_id')
  console.log(teddyId)
  return teddyId
}
// retrieve + display teddyInfo + color selection + add to cart
async function retrieveTeddy(teddyId) {
  await fetch(`http://localhost:3000/api/teddies/${teddyId}`)
    .then((response) => response.json())
    .then((teddyInfo) => {
      // retrieve html elements + display
      function displayTeddyInfo() {
        // create html elements *
        const teddyName = document.createElement('h2')
        teddyName.setAttribute('id', 'name')
        const teddyPrice = document.createElement('h3')
        teddyPrice.setAttribute('id', 'price')
        const teddyDescription = document.createElement('p')
        // create image in html + retrieve product image
        const teddyImage = document.createElement('img')
        teddyImage.src = `${teddyInfo.imageUrl}`
        // * put text in them *
        teddyName.textContent = `${teddyInfo.name}`
        teddyPrice.textContent = `${teddyInfo.price / 100} €`
        teddyDescription.textContent = `${teddyInfo.description}`
        // * display them
        productCard.append(teddyName, teddyPrice, teddyImage, teddyDescription)
      }
      displayTeddyInfo()

      // Get color list + "remember" selected color   ************ 
      function getColors() {
        // create variable for a loop
        const colors = teddyInfo.colors
        for (color of colors) {
          // get html element "select"
          const selectColor = document.getElementById('selectColor')
          // get html element "option"
          let option = document.createElement('option')
          // "remember" selected color 
          option.textContent = `${color}`
          // display selected color
          selectColor.appendChild(option)
        }
      }
      getColors()

      // Click "Ajouter au panier" button   ************ 
      document.getElementById("btnAddToCart").onclick = function () { popup() }

      // adding products to cart
      function addTeddyCart() {
        // object for teddy
        const teddy = {
          id: `${teddyId}`,
          name: `${teddyInfo.name}`,
          price: `${teddyInfo.price}`,
          color: `${document.getElementById('selectColor').value}`
        }
        // in case localStorage gets cleared
        if (localStorage.length === 0) {
          localStorage.setItem('cartContent', '[]')
        }

        // get cartContent in localStorage
        let cartContent = localStorage.getItem('cartContent')
        // make it more readable
        cartContent = JSON.parse(cartContent)
        //add another product
        cartContent.push(teddy)
        localStorage.setItem('cartContent', JSON.stringify(cartContent))
      }

      function popup() {
        // if user clicks on "OK"
        if (confirm(`Ajouter ${teddyInfo.name} (${document.getElementById('selectColor').value}) au panier ?`)) {
          location.href = 'cart.html'
          addTeddyCart()
        }
        // otherwise nothing happens
      }
    })
    // in case of an error
    .catch(error => console.log('error', error))
}
// executes both above functions
async function main() {
  // declare await here *
  const teddyId = await getTeddyId()
  // * await here on teddyId()
  retrieveTeddy(teddyId)
}
main()


