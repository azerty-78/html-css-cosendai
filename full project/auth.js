let users = [];

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

loadUsers();
