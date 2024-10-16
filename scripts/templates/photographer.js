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

  return { getUserCardDOM };
}
