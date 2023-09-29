// Differents markers

let blueIcon = new L.Icon({
	iconUrl: './leaflet/images/drone_blue.png',
	shadowUrl: './leaflet/images/marker-shadow.png',
	iconSize: [36, 36],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [36, 36]
});

let redIcon = new L.Icon({
	iconUrl: './leaflet/images/drone_red.png',
	shadowUrl: './leaflet/images/marker-shadow.png',
	iconSize: [36, 36],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [36, 36]
});

let greenIcon = new L.Icon({
	iconUrl: './leaflet/images/drone_green.png',
	shadowUrl: './leaflet/images/marker-shadow.png',
	iconSize: [36, 36],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [36, 36]
});

let goldIcon = new L.Icon({
	iconUrl: './leaflet/images/drone_gold.png',
	shadowUrl: './leaflet/images/marker-shadow.png',
	iconSize: [36, 36],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [36, 36]
});

let blackIcon = new L.Icon({
	iconUrl: './leaflet/images/drone_black.png',
	shadowUrl: './leaflet/images/marker-shadow.png',
	iconSize: [36, 36],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [36, 36]
});

let violetIcon = new L.Icon({
	iconUrl: './leaflet/images/drone_violet.png',
	shadowUrl: './leaflet/images/marker-shadow.png',
	iconSize: [36, 36],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [36, 36]
});
 
// Tableau des différentes villes

let villes = [
    {value: "select", nom: "Choisir une ville de départ", nom2: "Choisir une ville d'arrivée", coordonnees: "" },
    {value: "Bordeaux", nom: "Bordeaux", coordonnees: [44.820, -0.565] },
    {value: "Lyon", nom: "Lyon", coordonnees: [45.743, 4.842] },
    {value: "Paris", nom: "Paris", coordonnees: [48.827, 2.370] },
    {value: "Marseille", nom: "Marseille", coordonnees: [43.292, 5.369] },
    {value: "Lille", nom: "Lille", coordonnees: [50.618, 3.069] },
    {value: "Strasbourg", nom: "Strasbourg", coordonnees: [48.577, 7.758] },
    {value: "Nantes", nom: "Nantes", coordonnees: [47.212, -1.555] },
    {value: "Toulouse", nom: "Toulouse", coordonnees: [43.604, 1.443] },
    {value: "Nice", nom: "Nice", coordonnees: [43.703, 7.266] },
    {value: "Rennes", nom: "Rennes", coordonnees: [48.117, -1.677] },
    {value: "Montpellier", nom: "Montpellier", coordonnees: [43.611, 3.877] },
    {value: "Brest", nom: "Brest", coordonnees: [48.390, -4.486] },
    {value: "Grenoble", nom: "Grenoble", coordonnees: [45.188, 5.724] },
    {value: "Dijon", nom: "Dijon", coordonnees: [47.322, 5.041] },
    {value: "Le Havre", nom: "Le Havre", coordonnees: [49.493, 0.107] }
];

let dronesTab = [ 
    {value: "select", nom: "Choisir un drone"},
    {value: "drone1", nom: "Drone n°1", color: blueIcon, active: 'activeDrone1'},
    {value: "drone2", nom: "Drone n°2", color: redIcon, active: 'activeDrone2'},
    {value: "drone3", nom: "Drone n°3", color: greenIcon, active: 'activeDrone3'},
    {value: "drone4", nom: "Drone n°4", color: violetIcon, active: 'activeDrone4'},
    {value: "drone5", nom: "Drone n°5", color: goldIcon, active: 'activeDrone5'},
    {value: "drone6", nom: "Drone n°6", color: blackIcon, active: 'activeDrone6'}
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

    let optionStart = document.createElement('option');
    if (i === 0) {
        optionStart.disabled = true;
        optionStart.selected = true;
    }
    optionStart.value = `${villes[i].value}`;
    optionStart.text = `${villes[i].nom}`;

    let optionEnd = document.createElement('option');
    if (i === 0) {
        optionEnd.text = `${villes[i].nom2}`;
        optionEnd.disabled = true;
        optionEnd.selected = true;
    } else {
        optionEnd.text = `${villes[i].nom}`;
    }
    optionEnd.value = `${villes[i].value}`;
    
    start.add(optionStart, null);
    end.add(optionEnd, null);
}

// Création du select des droness

let drones = document.getElementById('drones');

for (let i = 0; i < dronesTab.length; i++) {
    
    let optionDrones = document.createElement('option');

    if (i === 0) {
        optionDrones.disabled = true;
        optionDrones.selected = true;
    }
    
    optionDrones.value = `${dronesTab[i].value}`;
    optionDrones.id = `${dronesTab[i].value}`;
    optionDrones.text = `${dronesTab[i].nom}`;
    
    drones.add(optionDrones, null);
};

// Affichage de la carte avec les coordonnées*

let zoom = 6.3;

let map = L.map('map').setView([46.468, 2.46], zoom);

// Affichage des tuiles de la carte

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Start Button

let startButton = document.getElementById('startButton');

// Récupération de la div d'affichage des drones activeList

let activeList = document.getElementById('activeList');

    startButton.onclick = function() {
        if (start.value === villes[0].value | end.value === villes[0].value | drones.value === dronesTab[0].value) {
            alert("Veuillez choisir un drone et renseigner la ville de départ et d'arrivée")
        } else if (start.value === end.value) {
            alert('Veuillez ne pas renseigner la même ville dans les deux sélecteurs')
        } else {
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

        let redPoint = '<i class="fa-solid fa-circle fa-beat-fade" style="color: #dd0e0e;"></i>'
        let droneActifId = null;
        let droneRemoved = null;

        for (let i = 0; i < dronesTab.length; i++) {
            if (drones.value === dronesTab[i].value) {
                activeList.innerHTML += `<li id="${dronesTab[i].active}"> 
                                            <p> Le ${dronesTab[i].nom} est en livraison. ${redPoint} </p> 
                                        </br> 
                                            <div id="chargementContainer">
                                                <div id="chargementBar"></div>
                                                <div id="chargementBarAnime"></div>
                                            </div>
                                        </li>`;
                iconDrone = dronesTab[i].color;
                droneActifId = dronesTab[i].active;
                console.log(drones.value)
                droneRemoved = document.getElementById(`${drones.value}`);

                droneRemoved.style.display = 'none';
                drones.value = dronesTab[0].value;
            };
        }

        startDrone(startCity, endCity, iconDrone, startCityName, endCityName, droneActifId, droneRemoved)
        };
    };

// Fonction qui suit après la fonction onClick

let chargeBar = document.getElementById('chargementBarAnime');

startDrone = function(startCity, endCity, iconDrone, startCityName, endCityName, droneActifId, droneRemoved){


    let speed = document.getElementById('speed').value;
    let realSpeed = speed*100;

    let marker = L.Marker.movingMarker([startCity, endCity, startCity], realSpeed, {icon: iconDrone}).addTo(map);
        
    marker.start();

    let increment = 10; // Montant à incrémenter à chaque seconde
    let progress = 0;

    function updateProgressBar() {
        gsap.to('#chargementBarAnime', {
            width: progress + '%',
            duration: 1 // Durée de l'animation en secondes (ajustez si nécessaire)
        });
    }

    let interval = setInterval(function() {
        if (progress < 100) {
            progress += increment; // Incrémentez progress de 1%
            updateProgressBar();
        } else {
            clearInterval(interval); // Arrêtez l'intervalle lorsque la progression atteint 100%
        }
        if (progress <= 0) {
            clearInterval(interval); // Arrêtez l'intervalle lorsque realDuration atteint 0
        }
    }, 1000); // Répétez toutes les secondes

    setTimeout(function() {
        marker.bindPopup(`Je viens de livrer à ${endCityName}, je retourne donc à ${startCityName}`).openPopup();
    }, (realSpeed/2));
    setTimeout(function() {
        marker.closePopup();
        console.log(activeList)
        setTimeout(function() {
            
            console.log(document.getElementById(droneActifId));
            droneRemoved.style.display = 'block';
            document.getElementById(droneActifId).remove();
            marker.remove();
        }, 500)
    }, realSpeed);    

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