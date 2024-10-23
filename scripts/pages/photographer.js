let totalLikes = 0;
let currentSortBy = "popularite"; // État pour suivre le tri actuel
// Liste des photographes avec leurs identifiants pour gérer les chemins des images
const photographerNames = {
  243: "Mimi",
  930: "Ellie Rose",
  82: "Tracy",
  527: "Nabeel",
  925: "Rhode",
  195: "Marcel",
};

// Fonction qui récupère les données des photographes depuis le fichier JSON
async function getPhotographersData() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data;
}

// Récupération de l'identifiant du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"), 10);

// Template pour structurer les informations du photographe
function photographerTemplate(data) {
  const { name, portrait, city, country, tagline } = data;
  const picture = `assets/images/Portrait/${portrait}`;

  // Fonction qui génère le DOM (HTML) pour l'en-tête du photographe
  function getHeaderDOM() {
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("photographer-header-info");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("photographer-details");

    const nameElement = document.createElement("h1");
    nameElement.textContent = name;

    const locationElement = document.createElement("h2");
    locationElement.textContent = `${city}, ${country}`;

    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;

    // Ajoute les éléments dans la structure
    detailsDiv.append(nameElement, locationElement, taglineElement); // Utilisation de append pour simplifier

    headerDiv.append(img, detailsDiv); // Utilisation de append pour simplifier

    return headerDiv;
  }

  return { getHeaderDOM };
}

// Fonction qui affiche les informations du photographe dans l'en-tête
async function displayPhotographerInfo(photographerId) {
  const { photographers } = await getPhotographersData();
  const photographer = photographers.find((p) => p.id === photographerId);

  if (photographer) {
    const photographerModel = photographerTemplate(photographer);
    const headerDOM = photographerModel.getHeaderDOM();
    const photographHeader = document.querySelector(".photograph-header");
    photographHeader.appendChild(headerDOM);
  }
}

// Fonction pour trier les médias
function sortMedia(media, sortBy) {
  switch (sortBy) {
    case "popularite":
      return media.sort((a, b) => b.likes - a.likes); // Tri par nombre de likes (du plus grand au plus petit)
    case "date":
      return media.sort((a, b) => new Date(b.date) - new Date(a.date)); // Tri par date (du plus récent au plus ancien)
    case "titre":
      return media.sort((a, b) => a.title.localeCompare(b.title)); // Tri par titre (alphabétiquement)
    default:
      return media;
  }
}

// Fonction pour afficher les médias du photographe
async function displayPhotographerMedia(photographerId, sortBy = "popularite") {
  const { media } = await getPhotographersData();
  const photographerMedia = media.filter(
    (item) => item.photographerId === photographerId
  );

  // Tri des médias en fonction de l'option sélectionnée
  const sortedMedia = sortMedia(photographerMedia, sortBy);

  const mediaSection = document.getElementById("media-section");
  mediaSection.innerHTML = ""; // Effacer les médias précédents

  setupLightbox(sortedMedia); // Initialisation de la lightbox

  // Boucle pour créer chaque média et ajouter les événements de clic
  sortedMedia.forEach((item, index) => {
    const mediaItem = mediaFactory(item);
    const mediaElement = mediaItem.getMediaDOM();

    // Ajoute un événement de clic pour ouvrir la Lightbox sur l'image ou la vidéo
    mediaElement
      .querySelector("img, video")
      .addEventListener("click", () => openLightbox(index));
    mediaSection.appendChild(mediaElement); // Ajoute le média à la section
  });
}

// -----------------------------------------------------------------------------------
// Factory pour générer la structure HTML pour chaque média (image ou vidéo)
// -----------------------------------------------------------------------------------
function mediaFactory(data) {
  const { title, image, video, likes } = data;
  let isLiked = false; // Variable pour suivre si l'utilisateur a liké

  // Fonction qui génère le DOM pour un média
  function getMediaDOM() {
    const mediaElement = document.createElement("div");
    mediaElement.classList.add("media-item");

    const photographerName = photographerNames[photographerId];
    const mediaSrc = image
      ? `assets/images/${photographerName}/${image}`
      : `assets/images/${photographerName}/${video}`;

    // Crée l'élément média (image ou vidéo)
    if (image) {
      const img = document.createElement("img");
      img.setAttribute("src", mediaSrc);
      img.setAttribute("alt", title);
      mediaElement.appendChild(img);
    } else if (video) {
      const videoElement = document.createElement("video");
      videoElement.setAttribute("src", mediaSrc);
      mediaElement.appendChild(videoElement);
    }

    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    const likesContainer = document.createElement("div");
    likesContainer.classList.add("likes-container");

    const likesElement = document.createElement("p");
    likesElement.textContent = likes;
    likesElement.classList.add("like-number");

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fas", "fa-heart");
    heartIcon.setAttribute("aria-label", "likes");

    // Gère l'événement de clic pour liker ou unliker un média
    heartIcon.addEventListener("click", () => {
      const currentLikes = parseInt(likesElement.textContent);
      likesElement.textContent = isLiked ? currentLikes - 1 : currentLikes + 1;
      isLiked = !isLiked; // Inverse l'état
      heartIcon.classList.toggle("liked", isLiked); // Ajoute ou enlève la classe liked
      updateTotalLikes(isLiked ? 1 : -1); // Met à jour le total des likes
    });

    // Ajoute le nombre de likes et l'icône cœur à la structure
    likesContainer.append(likesElement, heartIcon); // Utilisation de append pour simplifier
    mediaInfo.append(titleElement, likesContainer); // Utilisation de append pour simplifier
    mediaElement.appendChild(mediaInfo);

    return mediaElement;
  }

  return { getMediaDOM };
}

// Met à jour le compteur de likes total en bas de page
function updateTotalLikes(change) {
  totalLikes += change;
  const likesContainer = document.querySelector(".photographer-likes");
  likesContainer.querySelector(
    "span"
  ).innerHTML = `${totalLikes} <i class="fas fa-heart black-heart"></i>`;
}

// Calcule le nombre total de likes pour tous les médias du photographe
async function calculateTotalLikes(photographerId) {
  const { photographers, media } = await getPhotographersData();
  const photographer = photographers.find((p) => p.id === photographerId);
  const photographerMedia = media.filter(
    (item) => item.photographerId === photographerId
  );

  // Calcule la somme des likes pour tous les médias
  totalLikes = photographerMedia.reduce((acc, item) => acc + item.likes, 0);
  const pricePerDay = photographer.price;

  // Met à jour l'encart avec le nombre total de likes et le prix du photographe
  const likesContainer = document.querySelector(".photographer-likes");
  likesContainer.innerHTML = `
    <span>${totalLikes} <i class="fas fa-heart black-heart"></i></span>
    <span>${pricePerDay}€ / jour</span>
  `;
}

// Au chargement de la page, affiche les informations et les médias du photographe
document.addEventListener("DOMContentLoaded", () => {
  displayPhotographerInfo(photographerId);
  displayPhotographerMedia(photographerId, "popularite"); // Tri par défaut
  calculateTotalLikes(photographerId);
});

// Gérer le tri
const sortButton = document.getElementById("sortButton");
const sortOptions = document.getElementById("sortOptions");
const arrowIcon = document.getElementById("arrowIcon");

// Gère l'ouverture/fermeture du menu de tri et l'icône de la flèche
sortButton.addEventListener("click", (event) => {
  sortOptions.classList.toggle("show");

  // Change l'icône en fonction de l'état du menu
  arrowIcon.classList.toggle(
    "fa-chevron-up",
    sortOptions.classList.contains("show")
  );
  arrowIcon.classList.toggle(
    "fa-chevron-down",
    !sortOptions.classList.contains("show")
  );

  event.stopPropagation(); // Empêche l'événement de remonter dans la hiérarchie
});

// Gère le changement d'option de tri lorsque l'utilisateur clique sur une option
document.querySelectorAll(".sort-option").forEach((option) => {
  option.addEventListener("click", function () {
    const newSortBy = this.getAttribute("data-sort");

    // Mettez à jour l'état du tri actuel
    currentSortBy = newSortBy;

    const oldText = sortButton.textContent.trim();
    sortButton.firstChild.nodeValue = this.textContent;
    this.textContent = oldText;
    sortOptions.classList.remove("show");
    arrowIcon.classList.remove("fa-chevron-up");
    arrowIcon.classList.add("fa-chevron-down");

    // Afficher les médias triés selon l'option sélectionnée
    displayPhotographerMedia(photographerId, currentSortBy);
  });
});

// Gérer le clic en dehors du menu de tri pour le fermer
document.addEventListener("click", () => {
  sortOptions.classList.remove("show");
  arrowIcon.classList.remove("fa-chevron-up");
  arrowIcon.classList.add("fa-chevron-down");
});
