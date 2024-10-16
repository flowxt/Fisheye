//Mettre le code JavaScript lié à la page photographer.html
async function getMedia() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  const media = data.media;
  return media;
}
