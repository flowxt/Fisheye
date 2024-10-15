// Récupère les données depuis le fichier JSON
async function getPhotographers() {
  const response = await fetch("./data/photographers.json"); // Ici on recupère les données du fichier JSON
  const data = await response.json();
  const photographers = data.photographers;
  return photographers; // Retourne uniquement les photographes
}

// Génére les cartes des photographes en utilisant le template
function genererPhotographes(photographers) {
  const sectionPhotographer = document.querySelector(".photographer_section");

  photographers.forEach((photographerData) => {
    const photographerModel = photographerTemplate(photographerData); // Utilise le template
    const userCardDOM = photographerModel.getUserCardDOM(); // Crée la carte
    sectionPhotographer.appendChild(userCardDOM); // Ajoute la carte à la section
  });
}

// Initialisation de la page
async function init() {
  const photographers = await getPhotographers();
  genererPhotographes(photographers); // Appelle la fonction pour générer les cartes
}

init();
