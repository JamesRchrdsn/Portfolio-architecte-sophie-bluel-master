const modalContainer = document.querySelector(".modalContainer");
const actualGallery = document.createElement("div");
const xMark = document.createElement("i");

// connexion à l'api
const token = sessionStorage.getItem("userOnline")
  ? JSON.parse(sessionStorage.getItem("userOnline")).token
  : null;

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
    gallery.innerHTML = "";
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

      imgArchi(element);
    });
  } catch (error) {
    console.error("Error fetching works:", error);
  }
}
displayModal();

// Changement de modal ajout de photo
const validate = document.createElement("button");
const form = document.createElement("form");
const fileInput = document.createElement("input");
const titleInput = document.createElement("input");
const previous = document.createElement("i");
const secondaryTitle = document.createElement("h3");
const modulePhoto = document.createElement("div");
const newPhoto = document.createElement("i");
const btnPhoto = document.createElement("button");
const textPhoto = document.createElement("p");
const titleLabel = document.createElement("label");
const categorieLabel = document.createElement("label");
const categorieSelect = document.createElement("select");
const underBar = document.createElement("div");
const overlay = document.createElement("div");
// Fonction qui créer la seconde modal
function secondaryModal() {
  fetchCategories();
  previous.classList.add("fas", "fa-arrow-left");
  modalContainer.appendChild(previous);
  xMark.classList.add("fas", "fa-times");
  modalContainer.appendChild(xMark);
  secondaryTitle.classList.add("modalTitle");
  secondaryTitle.innerText = "Ajout photo";
  modalContainer.appendChild(secondaryTitle);
  modulePhoto.classList.add("modulePhoto");
  modalContainer.appendChild(modulePhoto);
  newPhoto.classList.add("far", "fa-image");
  modulePhoto.appendChild(newPhoto);
  btnPhoto.classList.add("btnPhoto");
  btnPhoto.innerText = "+ Ajouter photo";
  modulePhoto.appendChild(btnPhoto);
  textPhoto.classList.add("textPhoto");
  textPhoto.innerText = "jpg, png : 4mo max";
  modulePhoto.appendChild(textPhoto);
  modalContainer.appendChild(form);
  titleLabel.textContent = "Titre";
  form.appendChild(titleLabel);
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  titleInput.required = true;
  form.appendChild(titleInput);
  categorieLabel.textContent = "Catégorie";
  form.appendChild(categorieLabel);

  // Vide le menu déroulant des catégories
  // à chaques ouverture de la modal
  while (categorieSelect.firstChild) {
    categorieSelect.removeChild(categorieSelect.firstChild);
  }

  categorieSelect.id = "categorie";
  categorieSelect.name = "categorie";
  categorieSelect.required = true;
  form.appendChild(categorieSelect);
  underBar.classList.add("underBar");
  modalContainer.appendChild(underBar);
  validate.classList.add("validateBtn");
  validate.innerText = "Valider";
  modalContainer.appendChild(validate);
  // opacité derriere la modal
  overlay.classList.add("overlay", "active");
  document.body.appendChild(overlay);
  // Ajout de photo
  fileInput.type = "file";
  fileInput.id = "imageFile";
  fileInput.name = "imageFile";
  // N'accepte que les fichiers jpg, jpeg, png
  fileInput.accept = ".jpg, .jpeg, .png";
  // Masquer le champ de fichier
  fileInput.style.display = "none";
  modulePhoto.appendChild(fileInput);
}

// retour sur la premiere modal
previous.addEventListener("click", (event) => {
  closeModal();
  primaryModal();
  event.stopPropagation();
});
// Ouvrir le sélecteur de fichiers lorsque le bouton est cliqué
btnPhoto.addEventListener("click", () => {
  fileInput.click();
});

// Gérer le changement du champ de fichier
fileInput.addEventListener("change", (event) => {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    // Affiche l'image sélectionnée dans la modal
    const imgPreview = document.createElement("img");
    imgPreview.src = URL.createObjectURL(selectedFile);
    modulePhoto.appendChild(imgPreview);

    // Cache le bouton ajout lors de la previsualisation de l'image
    btnPhoto.classList.add("hidden");
  }
});
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

// Fonction envoie du formulaire
async function sendData() {
  // Récupération des valeurs des champs du formulaire
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("categorie").value.trim();
  const selectedFile = document.getElementById("imageFile").files[0];

  // Vérifie si les champs sont remplis et qu'un fichier est sélectionné
  if (title !== "" && category !== "" && selectedFile) {
    try {
      // Création d'un FormData pour envoyer les données du formulaire
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("image", selectedFile);

      // Envoi des données du formulaire au serveur
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Réinitialiser les champs du formulaire
        document.getElementById("title").value = "";
        document.getElementById("imageFile").value = "";
        // Supprimer l'aperçu de l'image
        const imgPreview = document.querySelector(".modulePhoto img");
        if (imgPreview) {
          imgPreview.remove();
        }

        // Actualiser l'affichage de la galerie après l'ajout de la photo
        displayModal();
        btnPhoto.classList.remove("hidden");
      } else {
        throw new Error("Erreur lors de l'envoi des données");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  } else {
    // Créer dynamiquement un message d'erreur si form incomplet
    const errorMessage = document.createElement("div");
    errorMessage.textContent =
      "Veuillez remplir tous les champs du formulaire.";
    errorMessage.id = "errorMessage";

    // Vérifier si le message d'erreur existe déjà
    const existingErrorMessage = document.getElementById("errorMessage");
    if (!existingErrorMessage) {
      // Ajouter le message d'erreur à la page
      modalContainer.insertBefore(errorMessage, underBar);
    }
  }
}
// Envoie le formulaire à l'api
// soit au click du bouton valider
validate.addEventListener("click", function (event) {
  event.preventDefault();
  sendData();
});
// soit quand on appuie sur entrée
form.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendData();
  }
});

// Fonction pour vérifier si le formulaire est rempli
function checkFormCompletion() {
  // Vérifier si les champs requis sont remplis
  const isTitleFilled = titleInput.value.trim() !== "";
  const isFileSelected = fileInput.files.length > 0;

  // Met à jour la classe du bouton de validation
  // Et enleve le message de form incomplet
  if (isTitleFilled && isFileSelected) {
    validate.classList.add("completedValidate");
    const errorMessage = document.getElementById("errorMessage");
    if (errorMessage) {
      errorMessage.remove();
    }
  } else {
    validate.classList.remove("completedValidate");
  }
}

// Ajoute des écouteurs d'événements pour les champs du formulaire
titleInput.addEventListener("input", checkFormCompletion);
fileInput.addEventListener("change", checkFormCompletion);
