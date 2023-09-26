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

let bordeaux = [44.820, -0.565];
let lyon = [45.743, 4.842];
let paris = [48.827, 2.370];
let marseille = [43.292, 5.369];
let lille = [50.618, 3.069];
let strasbourg = [48.577, 7.758];
let nantes = [47.216, 1.555];


startButton.onclick= function() {
    let start = document.getElementById('start').value;

    switch (start) {
        case 'bordeaux':
            startCity = bordeaux;
            break;
        case 'lyon':
            startCity = lyon;
            break;
        case 'paris':
            startCity = paris;
            break;
        case 'marseille':
            startCity = marseille;
            break;
        case 'lille':
            startCity = lille;
            break;
        case 'strasbourg':
            startCity = strasbourg;
            break;
        case 'nantes':
            startCity = nantes;
            break;
    };

    let end = document.getElementById('end').value;

    switch (end) {
        case 'bordeaux':
            endCity = bordeaux;
            break;
        case 'lyon':
            endCity = lyon;
            break;
        case 'paris':
            endCity = paris;
            break;
        case 'marseille':
            endCity = marseille;
            break;
        case 'lille':
            endCity = lille;
            break;
        case 'strasbourg':
            endCity = strasbourg;
            break;
        case 'nantes':
            startCity = nantes;
            break;
    };

    startDrone(startCity, endCity)
}

startDrone = function(startCity, endCity){

    let speed = document.getElementById('speed').value;

    console.log(endCity);

    let marker = L.Marker.movingMarker([startCity, endCity], speed).addTo(map);
        
    marker.start();
};








