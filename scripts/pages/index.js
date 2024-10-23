// Fonction utilitaire pour créer des éléments DOM
function createElement(tag, attributes = {}, textContent = "") {
  const element = document.createElement(tag);
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}

// Récupère les données depuis le fichier JSON (optimisé pour un seul appel)
let photographersData = null;
async function getPhotographers() {
  if (!photographersData) {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    photographersData = data.photographers;
  }
  return photographersData;
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
