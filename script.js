import { villes, dronesTab } from "./datas.js";
import { SearchCity } from "./api.js";

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

        let startCity = null;
        let startCityName = null;
        let endCity = null;
        let endCityName = null;

        for (let i = 0; i < villes.length; i++) {
            console.log(villes[i])
            if (start === villes[i].value) {
                startCity = villes[i].coordonnees
                startCityName = villes[i].nom

            } else if (end === villes[i].value) {
                endCity = villes[i].coordonnees
                endCityName = villes[i].nom
            }
        };

        let iconDrone = null;
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
                                                <div id="chargementBarAnime${dronesTab[i].active}" class="chargementBarAnime"></div>
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

    function startDrone(startCity, endCity, iconDrone, startCityName, endCityName, droneActifId, droneRemoved){


    let speed = document.getElementById('speed').value;
    let realSpeed = speed*100;

    let marker = L.Marker.movingMarker([startCity, endCity, startCity], realSpeed, {icon: iconDrone}).addTo(map);
        
    marker.start();

    let increment = 10; // Montant à incrémenter à chaque seconde
    let progress = 0;

    function updateProgressBar() {
        gsap.to(`#chargementBarAnime${droneActifId}`, {
            width: progress + '%',
            duration: 1 
        });
    }

    let interval = setInterval(function() {
        if (progress < 100) {
            progress += (increment / (realSpeed / 100));
            updateProgressBar();
        } else {
            clearInterval(interval);
        }
        if (progress <= 0) {
            clearInterval(interval);
        }
    },  900 / (realSpeed * 2));

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