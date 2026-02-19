async function search() {
    const response = await fetch("cars.json");
    const cars = await response.json();

    const budgetMax = document.getElementById("budgetMax").value;
    const anneeMin = document.getElementById("anneeMin").value;
    const type = document.getElementById("type").value;
    const carburant = document.getElementById("carburant").value;

    let filtered = cars.filter(car => {
        return (!budgetMax || car.prix <= budgetMax) &&
               (!anneeMin || car.annee >= anneeMin) &&
               (!type || car.type === type) &&
               (!carburant || car.carburant === carburant);
    });

    if (filtered.length === 0) {
        document.getElementById("bestCar").innerHTML = "<p>Aucune voiture trouvée</p>";
        return;
    }

    filtered.sort((a, b) => a.prix - b.prix);

    displayBest(filtered[0]);
    displayOthers(filtered.slice(1));
}

function displayBest(car) {
    document.getElementById("bestCar").innerHTML = `
        <h2>🏆 Meilleur choix</h2>
        <div class="card">
            <img src="${car.image}">
            <h3>${car.marque} ${car.modele}</h3>
            <p>${car.annee} - ${car.prix}€</p>
            <p>${car.puissance} ch - ${car.carburant}</p>
            <a href="${car.lien}" target="_blank">Voir l'annonce</a>
        </div>
    `;
}

function displayOthers(cars) {
    let html = "<h2>Autres propositions</h2>";
    cars.forEach(car => {
        html += `
            <div class="card">
                <img src="${car.image}">
                <h3>${car.marque} ${car.modele}</h3>
                <p>${car.prix}€</p>
            </div>
        `;
    });
    document.getElementById("otherCars").innerHTML = html;
}
