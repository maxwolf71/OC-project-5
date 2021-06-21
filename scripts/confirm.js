function displayOrderInfo() {
    // retrieve total from localStorage
    const total = localStorage.getItem('total')
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
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
    localStorage.clear()
}
displayOrderInfo()
<<<<<<< HEAD


=======
localStorage.clear()
localStorage.setItem('cartContent', JSON.stringify([]))
>>>>>>> d32b8a068ec2921ac65e58d5f342492f80465eb3
