// Variables
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

// Fonction qui retourne l'api works
async function getWork() {
  const apiWorks = await fetch("http://localhost:5678/api/works");
  return await apiWorks.json();
}
getWork();

// Afichage de works dans le DOM
async function showWorks() {
  const showImg = await getWork();
  showImg.forEach((element) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = element.imageUrl;
    figcaption.textContent = element.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}
showWorks();

// Affichage des Boutons Catégories

async function getCategories() {
  const apiCategories = await fetch("http://localhost:5678/api/categories");
  return await apiCategories.json();
}
getCategories();

async function btnCategories() {
  const categories = await getCategories();
  categories.forEach((iCategories) => {
    const btn = document.createElement("button");
    btn.textContent = iCategories.name;
    btn.id = iCategories.id;
    filters.appendChild(btn);
  });
}
btnCategories();
