let currentIndex = 0;
let mediaItems = []; // Pour stocker les chemins des médias

function openLightbox(index) {
  currentIndex = index; // Stocke l'index de l'image ou de la vidéo cliquée
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxVideo = document.getElementById("lightbox-video");
  const lightboxCaption = document.getElementById("lightbox-title"); // Change à "lightbox-title"

  // Réinitialise les éléments de la Lightbox
  lightboxImage.style.display = "none";
  lightboxVideo.style.display = "none";
  lightboxCaption.textContent = ""; // Réinitialise la légende

  const mediaItem = mediaItems[currentIndex]; // Récupère le média actuel

  if (mediaItem.type === "video") {
    // Si c'est une vidéo
    lightboxVideo.src = mediaItem.src; // Charge la vidéo
    lightboxVideo.style.display = "block"; // Affiche la vidéo
    lightboxCaption.textContent = mediaItem.title; // Légende pour la vidéo
  } else {
    // Si c'est une image
    lightboxImage.src = mediaItem.src; // Charge l'image
    lightboxImage.style.display = "block"; // Affiche l'image
    lightboxCaption.textContent = mediaItem.title; // Légende pour l'image
  }

  console.log("Média chargé:", mediaItem.src); // Vérifie quel média se charge
  lightbox.setAttribute("aria-hidden", "false"); // Montre la Lightbox
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.setAttribute("aria-hidden", "true"); // Cache la Lightbox
  // Réinitialise la source de la vidéo pour éviter qu'elle ne continue à jouer
  const lightboxVideo = document.getElementById("lightbox-video");
  lightboxVideo.src = ""; // Vide la source de la vidéo
}

function changeImage(direction) {
  currentIndex += direction; // Change l'index

  // Garde l'index dans les limites
  if (currentIndex < 0) {
    currentIndex = mediaItems.length - 1;
  } else if (currentIndex >= mediaItems.length) {
    currentIndex = 0;
  }

  openLightbox(currentIndex); // Ouvre la Lightbox avec le nouvel index
}

function setupLightbox(media) {
  mediaItems = media.map((item) => ({
    src: `assets/images/${photographerNames[item.photographerId]}/${
      item.image || item.video
    }`,
    title: item.title, // Récupère le titre du média
    type: item.image ? "image" : "video", // Détermine si c'est une image ou une vidéo
  }));

  console.log("Chemins des médias :", mediaItems); // Vérifie que les chemins sont corrects
}

//faut que je m'assure d'appeler setupLightbox(media) lors de l'affichage des médias
