function displayOrderInfo() {
    // retrieve total from localStorage
    const total = localStorage.getItem('total')
    // retrieve form elements from localStorage
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const orderId = localStorage.getItem('orderId')

    // if orderId is true
    if (orderId != null) {
        // display this :
        document.getElementById('recapDisplay').innerHTML = `
            
                <h2>Récapitulatif de votre commande</h2>
                <div id="recapOrder">
                    <p>Merci <span class="bold">${firstName}</span> <span class="bold">${lastName}</span> pour votre commande</p>
                    <p>Le montant total de votre commande est de : <span class="bold">${total}€</span></p>
                    <p>Votre numéro de commande est : <span class="bold">${orderId}</span></p>
                </div>
        `
    } else {
        // otherwise display this
        document.getElementById('recapDisplay').innerHTML = "Merci d'avoir choisi nos produits"
    }
    // clear localStorage, then add cartContent to localStorage
    localStorage.clear()
    localStorage.setItem('cartContent', '[]')
}
displayOrderInfo()


