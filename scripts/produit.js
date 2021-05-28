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
        teddyPrice.textContent = `${teddyInfo.price/100} €`
        teddyDescription.textContent = `${teddyInfo.description}`
        
        product.append(teddyName, teddyPrice, teddyImage, teddyDescription)
    }
    displayTeddyInfo()

    // Get color list + selected color   ************ 
    function getColors() {
      const colors = teddyInfo.colors 
      for(color of colors) {
        const selectColor = document.getElementById('selectColor')
        
        let option = document.createElement('option')
        option.textContent = `${color}`
        
        selectColor.appendChild(option)
      }
    }
    getColors() 
  })
}
async function main() {
  const teddyId = await getTeddyId()
  retrieveTeddy(teddyId)
}
main()

// Click Cart button   ************ 
function addTeddyCart() {
  const teddy = {
      name: localStorage.getItem('name'),
      color: localStorage.getItem('color'),  
      price: localStorage.getItem('price')  
  }
  let cart = localStorage.getItem('panier')
  cart = JSON.parse(cart)
  cart.push(teddy)
  localStorage.setItem('panier', JSON.stringify(cart))
  console.log(cart)
}

function selectedColor() {
      let theColor  = document.getElementById('selectColor').value;
      console.log(theColor)
    }