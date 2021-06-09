function displayTotalPrice() {
    const total = localStorage.getItem('total')

    const renameMeLater = `
        <div id="containerRecapOrder">
            <h2>Récaplitulatif de votre commande</h2>
            <div class="recapOrder">
                <p>Merci <span class="bold">Nom</span> <span class="bold">Prénom</span> pour votre commande</p>
                <p>Votre numéro de commande est : <span class="bold">xxxx</span></p>
                <p>Le montant de votre commande est : <span class="bold">${total}</span> €</p>
            </div>
        </div>
    `
    document.getElementById('recapDisplay').innerHTML = renameMeLater
}
displayTotalPrice()