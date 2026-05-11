// Tableau qui va contenir les utilisateurs chargés depuis users.json
let users = [];

// Gestion d'onglets (utile si des onglets existent dans le HTML)
const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".auth-panel");

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    const target = document.getElementById("panel-" + btn.dataset.tab);
    if (target) {
      target.classList.add("active");
    }
  });
});

// Affiche un message de succès/erreur dans un bloc cible
function setMessage(id, text, type) {
  const box = document.getElementById(id);
  if (!text) {
    box.innerHTML = "";
    return;
  }
  box.innerHTML = `<p class="msg ${type}">${text}</p>`;
}

// Normalise l'email pour comparer sans problème de casse/espaces
function normalize(email) {
  return (email || "").trim().toLowerCase();
}

async function loadUsers() {
  try {
    // Chargement normal depuis le fichier JSON local
    const res = await fetch("users.json");
    if (!res.ok) throw new Error("Impossible de charger users.json");
    const data = await res.json();
    users = data.users || [];
  } catch (err) {
    // Fallback utile si la page est ouverte sans serveur local.
    users = [
      { id: 1, fullName: "Brigitte Ndzié", email: "amina@mail.com", password: "1234" },
      { id: 2, fullName: "Arnaud Nkoum", email: "yassine@mail.com", password: "1234" },
      { id: 3, fullName: "Sandrine Mvondo", email: "khadija@mail.com", password: "abcd" },
      { id: 4, fullName: "Boris Tchoua", email: "samir@mail.com", password: "pass1" },
      { id: 5, fullName: "Carine Ndzi", email: "sara@mail.com", password: "pass2" }
    ];
    console.warn("users.json non chargé, fallback activé :", err.message);
  }
}

document.getElementById("btnSignIn").addEventListener("click", () => {
  // Récupération des champs de connexion
  const email = normalize(document.getElementById("loginEmail").value);
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    setMessage("msgSignIn", "Merci de remplir email et mot de passe.", "error");
    return;
  }

  // Vérifie si on trouve un utilisateur avec email + mot de passe corrects
  const user = users.find((u) => normalize(u.email) === email && u.password === password);

  if (!user) {
    setMessage("msgSignIn", "Identifiants incorrects.", "error");
    return;
  }

  setMessage("msgSignIn", `Connexion réussie. Bienvenue ${user.fullName}.`, "success");
});

// Lancement initial: charge la base utilisateurs au démarrage
loadUsers();
