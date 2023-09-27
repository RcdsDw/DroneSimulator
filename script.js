// Tableau des différentes villes

let villes = [
    {value: "", nom: "Choisir une ville de départ", nom2: "Choisir une ville d'arrivée", coordonnees: "" },
    {value: "Bordeaux", nom: "Bordeaux", coordonnees: [44.820, -0.565] },
    {value: "Lyon", nom: "Lyon", coordonnees: [45.743, 4.842] },
    {value: "Paris", nom: "Paris", coordonnees: [48.827, 2.370] },
    {value: "Marseille", nom: "Marseille", coordonnees: [43.292, 5.369] },
    {value: "Lille", nom: "Lille", coordonnees: [50.618, 3.069] },
    {value: "Strasbourg", nom: "Strasbourg", coordonnees: [48.577, 7.758] },
    {value: "Nantes", nom: "Nantes", coordonnees: [47.216, 1.555] },
    {value: "Toulouse", nom: "Toulouse", coordonnees: [43.604, 1.443] },
    {value: "Nice", nom: "Nice", coordonnees: [43.703, 7.266] },
    {value: "Rennes", nom: "Rennes", coordonnees: [48.117, -1.677] },
    {value: "Montpellier", nom: "Montpellier", coordonnees: [43.611, 3.877] },
    {value: "Brest", nom: "Brest", coordonnees: [48.390, -4.486] },
    {value: "Grenoble", nom: "Grenoble", coordonnees: [45.188, 5.724] },
    {value: "Dijon", nom: "Dijon", coordonnees: [47.322, 5.041] },
    {value: "Havre", nom: "Le Havre", coordonnees: [49.493, 0.107] }
];

// Test réutilisation d'un ancien code

async function SearchCity(city) {
    let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
    if (response.ok) {
       return await response.json()
    } else {
        return false;
    }
}

let search = document.getElementById('search')

let city = "";
let cityData = "";

search.onchange = function(e) {
    city = e.target.value;
    fetchData(city);
    return city;
}

// Récupération des données de la ville que je tape dans ma barre de recherche
// Push dans mon tableau de villes des données reçues pour voir ma nouvelle ville dans les selects

async function fetchData (city){
    let newLat = {}; 
    let newLng = {};

    let start = document.getElementById('start');
    let end = document.getElementById('end');

    let option = document.createElement('option');
    let option1 = document.createElement('option');

    if(city.length >= 1) {
        let response = await SearchCity(city)
        if (response === false) {
            alert("Whoops, cette ville n'existe pas...")
        } else if (response.results) {
                cityData = (response.results[0]);
                newLat = cityData.latitude;
                newLng = cityData.longitude;
                console.log(`${newLat}, ${newLng}`)
        } else {
            alert('Error')
        }
    };

    let newLatLng = [newLat, newLng];

    villes.push({value: `${city}`, nom: `${city}`, coordonnees: newLatLng });

    console.log(`${city}`);

    option.value = `${city}`;
    option.text = `${city}`;

    option1.value = `${city}`;
    option1.text = `${city}`;

    start.add(option, null);
    end.add(option1, null);

    console.log(`${newLatLng}`)

    return newLatLng;
}

// Création des deux selects de villes

let start = document.getElementById('start');
let end = document.getElementById('end');

for (let i = 0; i < villes.length; i++) {

    let option = document.createElement('option');
    option.value = `${villes[i].value}`;
    option.text = `${villes[i].nom}`;

    let option1 = document.createElement('option');
    if (i === 0) {
        option1.text = `${villes[i].nom2}`;
    } else {
        option1.text = `${villes[i].nom}`;
    }
    option1.value = `${villes[i].value}`;
    
    start.add(option, null);
    end.add(option1, null);
}


// Differents markers

let blueIcon = new L.Icon({
	iconUrl: './leaflet/images/marker-icon-2x-blue.png',
	shadowUrl: './leaflet/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

let redIcon = new L.Icon({
	iconUrl: './leaflet/images/marker-icon-2x-red.png',
	shadowUrl: './leaflet/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

let greenIcon = new L.Icon({
	iconUrl: './leaflet/images/marker-icon-2x-green.png',
	shadowUrl: './leaflet/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

// Affichage de la carte avec les coordonnées

let map = L.map('map').setView([46.24, 2.46], 6);

// Affichage des tuiles de la carte

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Start Button

let startButton = document.getElementById('startButton');

// Récupération du select de drone

let droneSelect = document.getElementById('drones');

// Récupération de la div d'affichage des drones actifs

let actifs = document.getElementById('activeList')

startButton.onclick= function() {
    console.log(villes);
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    console.log(start);
    console.log(end);

    for (let i = 0; i < villes.length; i++) {
        if (start === villes[i].value) {
            startCity = villes[i].coordonnees
            startCityName = villes[i].nom

        } else if (end === villes[i].value) {
            endCity = villes[i].coordonnees
            endCityName = villes[i].nom
        }
    };

    let drones = document.getElementById('drones').value;

    switch (drones) {
        case 'drone1':
            droneSelect.options[1].disabled = true;
            actifs.innerHTML += '<li id="droneActif1"> Le Drone n°1 est en livraison. </li>';
            iconDrone = redIcon;
            break;
        case 'drone2':
            droneSelect.options[2].disabled = true;
            actifs.innerHTML += '<li id="droneActif2"> Le Drone n°2 est en livraison. </li>';
            iconDrone = blueIcon;
            break;
        case 'drone3':
            droneSelect.options[3].disabled = true;
            actifs.innerHTML += '<li id="droneActif3"> Le Drone n°3 est en livraison. </li>';
            iconDrone = greenIcon;
            break;
    }

    startDrone(startCity, endCity, iconDrone, startCityName, endCityName)
};

startDrone = function(startCity, endCity){

    let speed = document.getElementById('speed').value;

    let marker = L.Marker.movingMarker([startCity, endCity, startCity], speed, {icon: iconDrone}).addTo(map);
        
    marker.start();

    setTimeout(function() {
        marker.bindPopup(`Je viens de livrer à ${endCityName}, je retourne donc à ${startCityName}`).openPopup();
    }, (speed/2));
    setTimeout(function() {
        marker.closePopup();
        setTimeout(function() {
            droneSelect.options[1].disabled = false;
            droneSelect.options[2].disabled = false;
            droneSelect.options[3].disabled = false;
            actifs.innerHTML = '';
            marker.remove()
        }, 1000)
    }, speed);    

    function getLatLngEveryTime() {

        document.getElementById('Lat').innerHTML = marker.getLatLng().lat;
        document.getElementById('Lng').innerHTML = marker.getLatLng().lng;

        window.requestAnimationFrame(getLatLngEveryTime);
    };

    window.requestAnimationFrame(getLatLngEveryTime);

    marker.on('click', function() {
        if (marker.isRunning()) {
            marker.pause();
        } else {
            marker.start();
        }
    });
};