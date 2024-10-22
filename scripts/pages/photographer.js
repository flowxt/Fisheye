const photographerNames = {
  243: "Mimi",
  930: "Ellie Rose",
  82: "Tracy",
  527: "Nabeel",
  925: "Rhode",
  195: "Marcel",
};

// Fonction pour récupérer les données des photographes et des médias
async function getPhotographersData() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data;
}

// Récupérer l'ID du photographe à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"), 10);

// Template pour le photographe
function photographerTemplate(data) {
  const { id, name, portrait, city, country, tagline } = data;
  const picture = `assets/images/Portrait/${portrait}`; // Chemin vers l'image du portrait

  function getHeaderDOM() {
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("photographer-header-info");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const nameElement = document.createElement("h1");
    nameElement.textContent = name;

    const locationElement = document.createElement("h2");
    locationElement.textContent = `${city}, ${country}`;

    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;

    // Ajouter tous les éléments dans headerDiv
    headerDiv.appendChild(img);
    headerDiv.appendChild(nameElement);
    headerDiv.appendChild(locationElement);
    headerDiv.appendChild(taglineElement);

    return headerDiv;
  }

  return { getHeaderDOM };
}

// Fonction pour afficher les informations du photographe
async function displayPhotographerInfo(photographerId) {
  const { photographers } = await getPhotographersData();

  // Trouver le photographe avec l'ID correspondant
  const photographer = photographers.find((p) => p.id === photographerId);

  if (photographer) {
    const photographerModel = photographerTemplate(photographer);
    const headerDOM = photographerModel.getHeaderDOM(); // Utiliser getHeaderDOM ici
    const photographHeader = document.querySelector(".photograph-header");

    // Insérer le contenu de l'en-tête
    photographHeader.appendChild(headerDOM); // Ajouter l'en-tête à la div photograph-header
  }
}

// Fonction pour afficher les médias du photographe
async function displayPhotographerMedia(photographerId) {
  const { media } = await getPhotographersData();
  const photographerMedia = media.filter(
    (item) => item.photographerId === photographerId
  );

  const mediaSection = document.getElementById("media-section");

  // Prépare les images pour la Lightbox
  setupLightbox(photographerMedia);

  photographerMedia.forEach((item, index) => {
    const mediaItem = mediaFactory(item);
    const mediaElement = mediaItem.getMediaDOM();

    // Ajoute un gestionnaire d'événements pour ouvrir la Lightbox
    mediaElement.querySelector("img, video").addEventListener("click", () => {
      console.log("Média cliqué", item); // Vérifie que l'élément est bien cliqué
      openLightbox(index);
    });

    mediaSection.appendChild(mediaElement);
  });
}

// Appel des fonctions pour afficher le photographe et ses médias
displayPhotographerInfo(photographerId); // Affiche les infos du photographe
displayPhotographerMedia(photographerId); // Affiche les médias du photographe

// Factory pour gérer les médias
function mediaFactory(data) {
  const { title, image, video, likes } = data;

  function getMediaDOM() {
    const mediaElement = document.createElement("div");
    mediaElement.classList.add("media-item");

    // Afficher une image ou une vidéo selon les données
    if (image) {
      const photographerName = photographerNames[photographerId];
      const img = document.createElement("img");
      img.setAttribute("src", `assets/images/${photographerName}/${image}`);
      img.setAttribute("alt", title);
      mediaElement.appendChild(img);
    } else if (video) {
      const photographerName = photographerNames[photographerId];
      const videoElement = document.createElement("video");
      videoElement.setAttribute(
        "src",
        `assets/images/${photographerName}/${video}`
      );
      mediaElement.appendChild(videoElement);
    }

    // Titre à gauche et likes + coeur à droite
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
    heartIcon.classList.add("fas", "fa-heart", "red-heart"); // Ajoute red-heart pour la couleur
    heartIcon.setAttribute("aria-label", "likes");

    let liked = false; // Variable pour savoir si la photo a déjà été likée

    // Gestion du clic pour liker
    heartIcon.addEventListener("click", () => {
      if (!liked) {
        // Si la photo n'a pas encore été likée
        let currentLikes = parseInt(likesElement.textContent);
        likesElement.textContent = currentLikes + 1;
        totalLikes++; // Incrémenter le total des likes
        updateTotalLikes(); // Mettre à jour l'encart des likes
        liked = true; // Empêcher un second clic
      }
    });

    likesContainer.appendChild(likesElement);
    likesContainer.appendChild(heartIcon);

    mediaInfo.appendChild(titleElement);
    mediaInfo.appendChild(likesContainer);
    mediaElement.appendChild(mediaInfo);

    return mediaElement;
  }

  return { getMediaDOM };
}

// Fonction pour calculer et afficher les likes totaux et le prix/jour
function calculateTotalLikes(photographerId) {
  getPhotographersData().then((data) => {
    const { photographers, media } = data;

    // Trouver le photographe correspondant à l'ID
    const photographer = photographers.find((p) => p.id === photographerId);

    // Filtrer les médias correspondant au photographe
    const photographerMedia = media.filter(
      (item) => item.photographerId === photographerId
    );

    // Calculer le nombre total de likes pour ce photographe
    const totalLikes = photographerMedia.reduce(
      (acc, item) => acc + item.likes,
      0
    );

    // Récupérer le prix du photographe
    const pricePerDay = photographer.price;

    // Mettre à jour l'encadré en bas de page avec les likes et le prix
    const likesContainer = document.querySelector(".photographer-likes");
    likesContainer.innerHTML = `
      <span>${totalLikes} <i class="fas fa-heart black-heart"></i></span>
      <span>${pricePerDay}€ / jour</span>
    `;
  });
}

// Appel de la fonction pour calculer les likes et afficher le prix
document.addEventListener("DOMContentLoaded", function () {
  calculateTotalLikes(photographerId); // Assurez-vous que photographerId est bien défini
});
