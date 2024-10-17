function photographerTemplate(data) {
  const { id, name, portrait, city, country, tagline, price } = data;
  const picture = `assets/images/Portrait/${portrait}`; // Chemin vers l'image du portrait

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Créer le lien autour de l'image
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`); // Lien vers la page du photographe
    link.setAttribute("aria-label", `Voir la page de ${name}`);

    const img = document.createElement("img");
    img.setAttribute("src", picture); // Assurez-vous que le chemin de l'image est correct
    img.setAttribute("alt", name);

    link.appendChild(img); // L'image devient le contenu du lien

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;

    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;

    const priceElement = document.createElement("p");
    priceElement.textContent = `${price}€/jour`;

    // Ajouter les éléments dans l'article
    article.appendChild(link); // Lien contenant l'image
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);

    return article;
  }

  function getHeaderDOM() {
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("photographer-header-info");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.classList.add("photographer-portrait"); // Ajout d'une classe pour le style

    const nameElement = document.createElement("h1");
    nameElement.textContent = name;

    const locationElement = document.createElement("h2");
    locationElement.textContent = `${city}, ${country}`;

    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;

    // Ajouter tous les éléments dans headerDiv
    headerDiv.appendChild(nameElement);
    headerDiv.appendChild(locationElement);
    headerDiv.appendChild(taglineElement);
    headerDiv.appendChild(img); // La photo à la fin

    return headerDiv;
  }

  return { getUserCardDOM, getHeaderDOM };
}
