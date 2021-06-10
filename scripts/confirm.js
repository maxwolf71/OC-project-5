function displayOrderInfo() {
    // retrieve total from localStorage
    const total = localStorage.getItem('total')
    const lastName = localStorage.getItem('lastName')
    const firstName = localStorage.getItem('firstName')
    const orderId = localStorage.getItem('orderId')

    const displayrecap = `
        <div id="containerRecapOrder">
            <h2>Récaplitulatif de votre commande</h2>
            <div class="recapOrder">
                <p>Merci <span class="bold">${lastName}</span> <span class="bold">${firstName}</span> pour votre commande</p>
                <p>Le montant total de votre commande est : <span class="bold">${total}</span> €</p>
                <p>Votre numéro de commande est : <span class="bold">${orderId}</span></p>
            </div>
        </div>
    `
    document.getElementById('recapDisplay').innerHTML = displayrecap
}
displayOrderInfo()