/**
 * Fonctions utilitaires partagées (dates, avatars, URL…)
 */

function getEmployeeIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function getInitials(name) {
  if (!name) return "NC";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function parseDate(value) {
  if (value == null || value === "") return null;
  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  const ms = num > 1e12 ? num : num * 1000;
  const parsed = new Date(ms);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDateFr(value) {
  const date = parseDate(value);
  if (!date) return "—";
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatBirthDate(value) {
  return formatDateFr(value);
}

function formatCreatedAt(value) {
  return formatDateFr(value);
}

function birthDateToInput(value) {
  const date = parseDate(value);
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

function inputToBirthDate(dateStr) {
  if (!dateStr) return null;
  return new Date(`${dateStr}T12:00:00`).toISOString();
}

function formatSex(sex) {
  if (!sex) return "—";
  const labels = { male: "Homme", female: "Femme", other: "Autre" };
  return labels[sex.toLowerCase()] || sex;
}

function renderAvatarCell(employee) {
  if (employee.avatar) {
    return `<img class="avatar-img avatar-img-sm" src="${employee.avatar}" alt="${employee.name}" loading="lazy">`;
  }
  return `<span class="employee-avatar employee-avatar-sm" aria-hidden="true">${getInitials(employee.name)}</span>`;
}

function renderProfileAvatar(employee) {
  const imgEl = document.getElementById("employeeAvatarImg");
  const initialsEl = document.getElementById("employeeAvatarInitials");
  if (!imgEl || !initialsEl) return;

  if (employee.avatar) {
    imgEl.src = employee.avatar;
    imgEl.alt = employee.name;
    imgEl.classList.remove("hidden");
    initialsEl.classList.add("hidden");
  } else {
    imgEl.classList.add("hidden");
    imgEl.removeAttribute("src");
    initialsEl.textContent = getInitials(employee.name);
    initialsEl.classList.remove("hidden");
  }
}
