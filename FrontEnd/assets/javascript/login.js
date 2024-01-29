const mail = document.querySelector(".logForm #email");
const password = document.querySelector(".logForm #password");
const errorMsg = document.querySelector(".logForm p");
const submit = document.querySelector(".logForm button");

let emailInput = "";
let passwordInput = "";

// Envoi de requete à l'API pour se connecter
const getLogin = async (user) => {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

// Vérifie le champs de saisie du mail et du mdp
mail.addEventListener("input", (e) => {
  emailInput = e.target.value;
});

password.addEventListener("input", (e) => {
  passwordInput = e.target.value;
});

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  let user = { email: emailInput, password: passwordInput };

  const responseForLogin = await getLogin(user);
  // Si mauvais identifiant renvoie une erreur
  if (!responseForLogin.ok || !emailInput || !passwordInput) {
    errorMsg.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
  } else {
    // Si bon identifiant renvoie sur la page principal
    let userOnline = await responseForLogin.json();
    sessionStorage.setItem("userOnline", JSON.stringify(userOnline));
    window.location.href = "index.html";
  }
});
