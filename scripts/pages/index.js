async function getPhotographers() {
  // Récupération des données depuis le fichier JSON
  const reponse = await fetch("./data/photographers.json");
  const data = await reponse.json();
  const photographers = data.photographers; // S'assurer de récupérer correctement la liste des photographes

  genererPhotographes(photographers);
  return {
    photographers: photographers,
  };
}

function genererPhotographes(photographers) {
  const sectionPhotographer = document.querySelector(".photographer_section");

  photographers.forEach((article) => {
    const photographerElement = document.createElement("article");

    const photographerPortrait = document.createElement("img");
    photographerPortrait.src = article.portrait; // Utilisez .src pour définir l'URL de l'image
    photographerPortrait.alt = article.name; // Ajoutez un alt pour l'accessibilité

    const photographerName = document.createElement("h2");
    photographerName.innerText = article.name;

    const photographerCity = document.createElement("h3");
    photographerCity.innerText = `${article.city}, ${article.country}`;

    const photographerTagline = document.createElement("p");
    photographerTagline.innerText = article.tagline;

    const photographerPrice = document.createElement("p");
    photographerPrice.innerText = `${article.price}€/jour`;

    // Ajoutez les éléments au photographeElement
    photographerElement.appendChild(photographerPortrait);
    photographerElement.appendChild(photographerName);
    photographerElement.appendChild(photographerCity);
    photographerElement.appendChild(photographerTagline);
    photographerElement.appendChild(photographerPrice);

    // Ajoutez le photographeElement à la section
    sectionPhotographer.appendChild(photographerElement);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
