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
    // Create (html elements) + display product details ************ 
    const teddyName = document.createElement('h1')
    const teddyPrice = document.createElement('h2')
    const teddyDescription = document.createElement('p')
    const teddyImage = document.createElement('img')
    teddyImage.src = `${teddyInfo.imageUrl}`
  
    teddyName.textContent = `${teddyInfo.name}`
    teddyPrice.textContent = `${teddyInfo.price/100} €`
    teddyDescription.textContent = `${teddyInfo.description}`
    
    product.append(teddyName, teddyPrice, teddyImage, teddyDescription)

    // Select Colors   ************ 
    const colors = teddyInfo.colors 
    for(color of colors) {
      const colorList = document.getElementById('selectColor')
  
      let newListItem = document.createElement('option')
      newListItem.textContent = `${color}`
  
      colorList.appendChild(newListItem)
    }
    
    // Cart button   ************ 

    const btnCart = document.createElement('button') 
    btnCart.setAttribute('id', 'btnCart')
    btnCart.textContent = 'Ajouter au panier'
    product.appendChild(btnCart)

    // Click Cart button   ************ 

    btnCart.onclick = function() {
      let colorValue = document.getElementById('selectColor').value
      
      localStorage.setItem('name', `${teddyInfo.name}`)
      localStorage.setItem('color', `(${colorValue}) `)
      localStorage.setItem('price', `${teddyInfo.price/100}`)
      localStorage.setItem('image', `${teddyImage}`)
      console.log(teddyImage)
    }
  })
}

async function main() {
  const teddyId = await getTeddyId()
  retrieveTeddy(teddyId)
}
main()
