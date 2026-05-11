let users = [];

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

function setMessage(id, text, type) {
  const box = document.getElementById(id);
  if (!text) {
    box.innerHTML = "";
    return;
  }
  box.innerHTML = `<p class="msg ${type}">${text}</p>`;
}

function normalize(email) {
  return (email || "").trim().toLowerCase();
}

async function loadUsers() {
  try {
    const res = await fetch("users.json");
    if (!res.ok) throw new Error("Impossible de charger users.json");
    const data = await res.json();
    users = data.users || [];
  } catch (err) {
    // Fallback utile si la page est ouverte sans serveur local.
    users = [
      { id: 1, fullName: "Amina Rahimi", email: "amina@mail.com", password: "1234" },
      { id: 2, fullName: "Yassine El Idrissi", email: "yassine@mail.com", password: "1234" },
      { id: 3, fullName: "Khadija Tazi", email: "khadija@mail.com", password: "abcd" },
      { id: 4, fullName: "Samir Alaoui", email: "samir@mail.com", password: "pass1" },
      { id: 5, fullName: "Sara Bennani", email: "sara@mail.com", password: "pass2" }
    ];
    console.warn("users.json non chargé, fallback activé :", err.message);
  }
}

document.getElementById("btnSignIn").addEventListener("click", () => {
  const email = normalize(document.getElementById("loginEmail").value);
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    setMessage("msgSignIn", "Merci de remplir email et mot de passe.", "error");
    return;
  }

  const user = users.find((u) => normalize(u.email) === email && u.password === password);

  if (!user) {
    setMessage("msgSignIn", "Identifiants incorrects.", "error");
    return;
  }

  setMessage("msgSignIn", `Connexion réussie. Bienvenue ${user.fullName}.`, "success");
});

document.getElementById("btnSignUp").addEventListener("click", () => {
  const fullName = document.getElementById("signupName").value.trim();
  const email = normalize(document.getElementById("signupEmail").value);
  const password = document.getElementById("signupPassword").value;

  if (!fullName || !email || !password) {
    setMessage("msgSignUp", "Tous les champs sont obligatoires.", "error");
    return;
  }

  if (password.length < 4) {
    setMessage("msgSignUp", "Le mot de passe doit avoir au moins 4 caractères.", "error");
    return;
  }

  const exists = users.some((u) => normalize(u.email) === email);
  if (exists) {
    setMessage("msgSignUp", "Cet email existe déjà.", "error");
    return;
  }

  users.push({
    id: users.length + 1,
    fullName,
    email,
    password
  });
  setMessage("msgSignUp", `Compte créé pour ${fullName}. Vous pouvez vous connecter.`, "success");
});

document.getElementById("btnForgot").addEventListener("click", () => {
  const email = normalize(document.getElementById("forgotEmail").value);
  if (!email) {
    setMessage("msgForgot", "Merci de saisir un email.", "error");
    return;
  }

  const user = users.find((u) => normalize(u.email) === email);
  if (!user) {
    setMessage("msgForgot", "Aucun compte trouvé avec cet email.", "error");
    return;
  }

  setMessage("msgForgot", `Demande envoyée. Mot de passe actuel (démo): ${user.password}`, "success");
});

loadUsers();
