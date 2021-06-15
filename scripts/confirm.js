function displayOrderInfo() {
    // retrieve total from localStorage
    const total = localStorage.getItem('total')
    const lastName = localStorage.getItem('lastName')
    const firstName = localStorage.getItem('firstName')
    const orderId = localStorage.getItem('orderId')

    if (orderId != null) {

        document.getElementById('recapDisplay').innerHTML = `
            
                <h2>Récapitulatif de votre commande</h2>
                <div id="recapOrder">
                    <p>Merci <span class="bold">${firstName}</span> <span class="bold">${lastName}</span> pour votre commande</p>
                    <p>Le montant total de votre commande est de : <span class="bold">${total}€</span></p>
                    <p>Votre numéro de commande est : <span class="bold">${orderId}</span></p>
                </div>
        `
    } else {
        document.getElementById('recapDisplay').innerHTML = "Merci d'avoir choisi nos produits"
    }
}
displayOrderInfo()
localStorage.clear()
localStorage.setItem('localCart', JSON.stringify([]))