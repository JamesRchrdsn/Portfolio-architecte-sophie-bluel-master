const modalContainer = document.querySelector(".modalContainer");
const actualGallery = document.createElement("div");
const xMark = document.createElement("i");

// Fonction qui créer la modal et tout les champs
// dont elle a besoin et qui gère la fermeture
function primaryModal() {
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
  // opacite derriere la modal
  const overlay = document.createElement("div");
  overlay.classList.add("overlay", "active");
  document.body.appendChild(overlay);
  // ouverture de la seconde modal
  addPhoto.addEventListener("click", (event) => {
    closeModal(); // Fermer la modal principale
    secondaryModal(); // Afficher la modal d'ajout de photo
    event.stopPropagation();
  });

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
btnModif.addEventListener("click", (event) => {
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
  // Retirer la classe active de l'overlay (opacite)
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.remove();
  }
}

// Fonction de suppression d'image
function deleteImg(trash) {
  const id = trash.id;
  //   une modale plus petite pour confirmer la suppression
  const isConfirmed = window.confirm(
    "Voulez-vous vraiment supprimer cette image ?"
  );
  if (!isConfirmed) {
    // annule la suppression si click sur annuler
    return;
  }
  //   recuperation de mon état connecté
  const token = sessionStorage.getItem("userOnline")
    ? JSON.parse(sessionStorage.getItem("userOnline")).token
    : null;

  if (!token) {
    // si pas de token annulation
    return;
  }

  //   connexion a l'api
  const garbage = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //  direction le work correspondant a l'id
  fetch(`http://localhost:5678/api/works/${id}`, garbage)
    .then((response) => {
      if (!response.ok) {
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        return {};
      }
    })
    .then((data) => {
      // Une fois l'image supprimée, actualisez l'affichage de la galerie
      displayModal();
    })
    .catch((error) => {
      console.error("Error deleting image:", error);
    });
}

// Fonction d'affichage des images dans la modal
async function displayModal() {
  try {
    const imgModal = await getWork();
    actualGallery.innerHTML = "";
    imgModal.forEach((element) => {
      // creation de chaques images presente dans l'api
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const trash = document.createElement("i");
      trash.classList.add("fas", "fa-trash-alt");
      trash.id = element.id;

      // evenement pour chaques corbeilles
      trash.addEventListener("click", () => deleteImg(trash));

      img.src = element.imageUrl;
      figure.appendChild(trash);
      figure.appendChild(img);
      actualGallery.appendChild(figure);
    });
  } catch (error) {
    console.error("Error fetching works:", error);
  }
}
displayModal();

// Changement de modal ajout de photo

// Fonction qui créer la seconde modal
function secondaryModal() {
  fetchCategories();
  const previous = document.createElement("i");
  previous.classList.add("fas", "fa-arrow-left");
  modalContainer.appendChild(previous);
  xMark.classList.add("fas", "fa-times");
  modalContainer.appendChild(xMark);
  const secondaryTitle = document.createElement("h3");
  secondaryTitle.classList.add("modalTitle");
  secondaryTitle.innerText = "Ajout photo";
  modalContainer.appendChild(secondaryTitle);
  const modulePhoto = document.createElement("div");
  modulePhoto.classList.add("modulePhoto");
  modalContainer.appendChild(modulePhoto);
  const newPhoto = document.createElement("i");
  newPhoto.classList.add("far", "fa-image");
  modulePhoto.appendChild(newPhoto);
  const btnPhoto = document.createElement("button");
  btnPhoto.classList.add("btnPhoto");
  btnPhoto.innerText = "+ Ajouter photo";
  modulePhoto.appendChild(btnPhoto);
  const textPhoto = document.createElement("p");
  textPhoto.classList.add("textPhoto");
  textPhoto.innerText = "jpg, png : 4mo max";
  modulePhoto.appendChild(textPhoto);
  const form = document.createElement("form");
  modalContainer.appendChild(form);
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Titre";
  form.appendChild(titleLabel);
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  titleInput.required = true;
  form.appendChild(titleInput);
  const categorieLabel = document.createElement("label");
  categorieLabel.textContent = "Catégorie";
  form.appendChild(categorieLabel);
  const categorieSelect = document.createElement("select");
  categorieSelect.id = "categorie";
  categorieSelect.name = "categorie";
  categorieSelect.required = true;
  form.appendChild(categorieSelect);
  const underBar = document.createElement("div");
  underBar.classList.add("underBar");
  modalContainer.appendChild(underBar);
  const validate = document.createElement("button");
  validate.classList.add("validateBtn");
  validate.innerText = "Valider";
  modalContainer.appendChild(validate);
  // opacité derriere la modal
  const overlay = document.createElement("div");
  overlay.classList.add("overlay", "active");
  document.body.appendChild(overlay);
  // retour sur la premiere modal
  previous.addEventListener("click", (event) => {
    closeModal(); // Fermer la modal principale
    primaryModal(); // Afficher la modal d'ajout de photo
    event.stopPropagation();
  });
}

// Recupération des catégories
async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();

    // Remplir le menu déroulant avec les catégories
    const selectCategorie = document.getElementById("categorie");
    data.forEach((categorie) => {
      const option = document.createElement("option");
      option.value = categorie.id;
      option.textContent = categorie.name;
      selectCategorie.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
  }
}
