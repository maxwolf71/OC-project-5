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
    // Click Cart button   ************ 
    function addTeddyCart() {
      localStorage.setItem('id', teddyId)
    }
  })
}

async function main() {
  const teddyId = await getTeddyId()
  retrieveTeddy(teddyId)
}
main()
