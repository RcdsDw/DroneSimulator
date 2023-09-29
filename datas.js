import { blueIcon, redIcon, greenIcon, goldIcon, blackIcon, violetIcon } from "./dronesMarkers.js";

// Tableau des différentes villes

export let villes = [
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

export let dronesTab = [ 
    {value: "select", nom: "Choisir un drone"},
    {value: "drone1", nom: "Drone n°1", color: blueIcon, active: 'activeDrone1'},
    {value: "drone2", nom: "Drone n°2", color: redIcon, active: 'activeDrone2'},
    {value: "drone3", nom: "Drone n°3", color: greenIcon, active: 'activeDrone3'},
    {value: "drone4", nom: "Drone n°4", color: violetIcon, active: 'activeDrone4'},
    {value: "drone5", nom: "Drone n°5", color: goldIcon, active: 'activeDrone5'},
    {value: "drone6", nom: "Drone n°6", color: blackIcon, active: 'activeDrone6'}
];