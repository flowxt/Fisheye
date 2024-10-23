function photographerTemplate(data) {
  const { id, name, portrait, city, country, tagline, price } = data;
  const picture = `assets/images/Portrait/${portrait}`; // Chemin vers l'image du portrait

  // Fonction utilitaire pour créer un élément DOM
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

  // Fonction utilitaire pour créer une image
  function createImage(src, alt, className = "") {
    const img = createElement("img", { src, alt });
    if (className) img.classList.add(className);
    return img;
  }

  function getUserCardDOM() {
    const article = createElement("article");

    // Créer le lien autour de l'image
    const link = createElement("a", {
      href: `photographer.html?id=${id}`,
      "aria-label": `Voir la page de ${name}`,
    });
    const img = createImage(picture, name);
    link.appendChild(img); // L'image devient le contenu du lien

    const h2 = createElement("h2", {}, name);
    const location = createElement("h3", {}, `${city}, ${country}`);
    const taglineElement = createElement("p", {}, tagline);
    const priceElement = createElement("p", {}, `${price}€/jour`);

    // Ajouter les éléments dans l'article
    article.append(link, h2, location, taglineElement, priceElement);
    return article;
  }

  function getHeaderDOM() {
    const headerDiv = createElement("div", {
      class: "photographer-header-info",
    });

    const nameElement = createElement("h1", {}, name);
    const locationElement = createElement("h2", {}, `${city}, ${country}`);
    const taglineElement = createElement("p", {}, tagline);
    const img = createImage(picture, name, "photographer-portrait"); // Ajout d'une classe pour le style

    headerDiv.append(nameElement, locationElement, taglineElement, img); // La photo à la fin
    return headerDiv;
  }

  return { getUserCardDOM, getHeaderDOM };
}
