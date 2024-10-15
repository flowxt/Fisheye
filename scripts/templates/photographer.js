function photographerTemplate(data) {
  // fonction appelé qui prend en parametre le data
  const { name, portrait, city, country, tagline, price } = data; // Extraction des données
  const picture = `assets/images/Portrait/${portrait}`; // Chemin des portraits

  function getUserCardDOM() {
    const article = document.createElement("article"); // Crée un élément article qui va contenir tous les éléments de la carte

    const img = document.createElement("img");
    img.setAttribute("src", picture); // Affiche le portrait
    img.setAttribute("alt", `${name}`); // Affiche le alt avec le nom du photographe

    const h2 = document.createElement("h2"); // Crée un élément h2 qui va contenir le nom du photographe
    h2.textContent = name;

    const location = document.createElement("h3"); // Crée un élément h3 qui va contenir la ville et le pays
    location.textContent = `${city}, ${country}`;

    const taglineElement = document.createElement("p"); // Crée un élément p qui va contenir le tagline
    taglineElement.textContent = tagline;

    const priceElement = document.createElement("p");
    priceElement.textContent = `${price}€/jour`; // Affiche le prix par jour

    // Ici tous les éléments sont ajoutés à l'élément article
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);

    return article;
  }

  return { getUserCardDOM }; // Retourne la fonction qui crée la carte
}
