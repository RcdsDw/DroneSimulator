// Differents markers

let blueIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-blue.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

let redIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-red.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

let greenIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-green.png',
	shadowUrl: 'img/marker-shadow.png',
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

// Récupération des différents drones

let marker = document.getElementById('drones').value;

// Start Button

let startButton = document.getElementById('startButton');

// Tableau des différentes villes

/* let bordeaux = [44.820, -0.565];
let lyon = [45.743, 4.842];
let paris = [48.827, 2.370];
let marseille = [43.292, 5.369];
let lille = [50.618, 3.069];
let strasbourg = [48.577, 7.758];
let nantes = [47.216, 1.555]; */

let villes = [
    { nom: "Bordeaux", coordonnees: [44.820, -0.565] },
    { nom: "Lyon", coordonnees: [45.743, 4.842] },
    { nom: "Paris", coordonnees: [48.827, 2.370] },
    { nom: "Marseille", coordonnees: [43.292, 5.369] },
    { nom: "Lille", coordonnees: [50.618, 3.069] },
    { nom: "Strasbourg", coordonnees: [48.577, 7.758] },
    { nom: "Nantes", coordonnees: [47.216, 1.555] },
    { nom: "Toulouse", coordonnees: [43.604, 1.443] },
    { nom: "Nice", coordonnees: [43.703, 7.266] },
    { nom: "Rennes", coordonnees: [48.117, -1.677] },
    { nom: "Montpellier", coordonnees: [43.611, 3.877] },
    { nom: "Brest", coordonnees: [48.390, -4.486] },
    { nom: "Grenoble", coordonnees: [45.188, 5.724] },
    { nom: "Dijon", coordonnees: [47.322, 5.041] },
    { nom: "Le Havre", coordonnees: [49.493, 0.107] }
];


startButton.onclick= function() {
    let start = document.getElementById('start').value;

    switch (start) {
        case 'bordeaux':
            startCity = villes[0].coordonnees;
            break;
        case 'lyon':
            startCity = villes[1].coordonnees;
            break;
        case 'paris':
            startCity = villes[2].coordonnees;
            break;
        case 'marseille':
            startCity = villes[3].coordonnees;
            break;
        case 'lille':
            startCity = villes[4].coordonnees;
            break;
        case 'strasbourg':
            startCity = villes[5].coordonnees;
            break;
        case 'nantes':
            startCity = villes[6].coordonnees;
            break;
        case 'toulouse':
            startCity = villes[7].coordonnees;
            break;
        case 'nice':
            startCity = villes[8].coordonnees;
            break;
        case 'rennes':
            startCity = villes[9].coordonnees;
            break;
        case 'montpellier':
            startCity = villes[10].coordonnees;
            break;
        case 'brest':
            startCity = villes[11].coordonnees;
            break;
        case 'grenoble':
            startCity = villes[12].coordonnees;
            break;
        case 'dijon':
            startCity = villes[13].coordonnees;
            break;
        case 'lehavre':
            startCity = villes[14].coordonnees;
            break;
    };

    let end = document.getElementById('end').value;

    switch (end) {
        case 'bordeaux':
            endCity = villes[0].coordonnees;
            break;
        case 'lyon':
            endCity = villes[1].coordonnees;
            break;
        case 'paris':
            endCity = villes[2].coordonnees;
            break;
        case 'marseille':
            endCity = villes[3].coordonnees;
            break;
        case 'lille':
            endCity = villes[4].coordonnees;
            break;
        case 'strasbourg':
            endCity = villes[5].coordonnees;
            break;
        case 'nantes':
            endCity = villes[6].coordonnees;
            break;
        case 'toulouse':
            endCity = villes[7].coordonnees;
            break;
        case 'nice':
            endCity = villes[8].coordonnees;
            break;
        case 'rennes':
            endCity = villes[9].coordonnees;
            break;
        case 'montpellier':
            endCity = villes[10].coordonnees;
            break;
        case 'brest':
            endCity = villes[11].coordonnees;
            break;
        case 'grenoble':
            endCity = villes[12].coordonnees;
            break;
        case 'dijon':
            endCity = villes[13].coordonnees;
            break;
        case 'lehavre':
            endCity = villes[14].coordonnees;
            break;
    };

    startDrone(startCity, endCity)
}

startDrone = function(startCity, endCity){

    let speed = document.getElementById('speed').value;

    console.log(endCity);

    let marker = L.Marker.movingMarker([startCity, endCity, startCity], speed).addTo(map);

    /* document.getElementById('Lat').innerHTML = "";
    document.getElementById('Lng').innerHTML = ""; */
        
    marker.start();

    function getLatLngEveryTime() {

        document.getElementById('Lat').innerHTML = marker.getLatLng().lat;
        document.getElementById('Lng').innerHTML = marker.getLatLng().lng;
        setInterval(function() {
            window.requestAnimationFrame(getLatLngEveryTime);
        }, 500);
    }

    window.requestAnimationFrame(getLatLngEveryTime);
};














