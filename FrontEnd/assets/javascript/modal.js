const modalContainer = document.querySelector(".modalContainer");
const actualGallery = document.createElement("div");

// Fonction qui créer la modal et tout les champs
// dont elle a besoin et qui gère la fermeture
function primaryModal() {
  const xMark = document.createElement("i");
  xMark.classList.add("fas", "fa-times");
  modalContainer.appendChild(xMark);
  const primaryTitle = document.createElement("h3");
  primaryTitle.classList.add("modalTitle");
  primaryTitle.innerText = "Galerie photo";
  modalContainer.appendChild(primaryTitle);
  actualGallery.classList.add("actualGallery");
  modalContainer.appendChild(actualGallery);
  const underBar = document.createElement("div");
  underBar.classList.add("underBar");
  modalContainer.appendChild(underBar);
  const addPhoto = document.createElement("button");
  addPhoto.classList.add("modalBtn");
  addPhoto.innerText = "Ajouter une photo";
  modalContainer.appendChild(addPhoto);

  //   Fermeture de la modal via la x
  xMark.addEventListener("click", closeModal);
  // gestionnaire d'event au clic endehors de la modale
  document.addEventListener("click", function (event) {
    // Vérifie si le clic s'est produit en dehors de la modal
    if (!modalContainer.contains(event.target)) {
      closeModal();
    }
  });
}
// Vérifie si la modal est ouverte ou non
let isModalOpen = false;
// Affichage de la modal
btnModif.addEventListener("click", () => {
  // Evite que la modale se ferme dès l'ouverture à cause du click
  event.stopPropagation();
  if (!isModalOpen) {
    primaryModal();
    isModalOpen = true;
  }
});

// Fonction qui créer la capicité de fermer la modal
function closeModal() {
  isModalOpen = false;
  // Supprimez les éléments de la modal
  modalContainer.textContent = "";
}

// Fonction d'affichage des images dans la modal
async function displayGarage() {
  actualGallery.innerHTML = "";
  const imgModal = await getWork();
  imgModal.forEach((element) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const trash = document.createElement("i");
    trash.classList.add("fas", "fa-trash-alt");
    trash.id = element.id;
    img.src = element.imageUrl;
    figure.appendChild(trash);
    figure.appendChild(img);
    actualGallery.appendChild(figure);
  });
}
displayGarage();
