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
    imgArchi(element);
  });
}
showWorks();

// Creation des images dans le dom
function imgArchi(element) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = element.imageUrl;
  figcaption.textContent = element.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

// // Affichage des Boutons Catégories

async function getCategories() {
  const apiCategories = await fetch("http://localhost:5678/api/categories");
  return await apiCategories.json();
}
getCategories();
async function btnCategories() {
  const categories = await getCategories();
  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.id = "0";
  filters.appendChild(allBtn);
  allBtn.classList.add("btnActive");
  categories.forEach((categorie) => {
    const btn = document.createElement("button");
    btn.textContent = categorie.name;
    btn.id = categorie.id;
    filters.appendChild(btn);
  });
}
btnCategories();

// Fonction filtres des catégories

async function filtersCat() {
  const imgFilter = await getWork();
  const filtersBtn = document.querySelectorAll(".filters button");
  filtersBtn.forEach((everyBtn) => {
    everyBtn.addEventListener("click", (e) => {
      idBtn = e.target.id;
      gallery.innerHTML = "";
      filtersBtn.forEach((btn) => {
        btn.classList.remove("btnActive");
      });
      everyBtn.classList.add("btnActive");
      if (idBtn !== "0") {
        const cleanCat = imgFilter.filter((element) => {
          return element.categoryId == idBtn;
        });
        cleanCat.forEach((element) => {
          imgArchi(element);
        });
      } else {
        showWorks();
      }
    });
  });
}
filtersCat();
