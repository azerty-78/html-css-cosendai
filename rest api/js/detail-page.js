/**
 * Page détail (employee.html)
 * - GET  → fetchEmployeeById() au chargement
 * - PUT  → updateEmployee() à la soumission du formulaire
 */

let currentEmployee = null;

function showDetailState(state) {
  const loading = document.getElementById("loadingState");
  const error = document.getElementById("errorState");
  const detail = document.getElementById("employeeDetail");

  if (loading) loading.classList.toggle("hidden", state !== "loading");
  if (error) error.classList.toggle("hidden", state !== "error");
  if (detail) detail.classList.toggle("hidden", state !== "success");
}

function showFeedback(message, type = "success") {
  const feedback = document.getElementById("feedbackMessage");
  if (!feedback) return;

  feedback.textContent = message;
  feedback.className = `feedback feedback-${type}`;
  feedback.classList.remove("hidden");

  setTimeout(() => {
    feedback.classList.add("hidden");
  }, 4500);
}

function renderEmployeeDetail(employee) {
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? "—";
  };

  renderProfileAvatar(employee);

  setText("employeeId", employee.id);
  setText("employeeName", employee.name);
  setText("employeeJob", employee.job);
  setText("employeeJobDetail", employee.job);
  setText("employeeSex", formatSex(employee.sex));
  setText("employeeSexBadge", formatSex(employee.sex));
  setText("employeeBirthDate", formatBirthDate(employee.birth_date));
  setText("employeeCreatedAt", formatCreatedAt(employee.createdAt));
  setText("employeeAddress", employee.address);

  const emailEl = document.getElementById("employeeEmail");
  if (emailEl) {
    emailEl.textContent = employee.email || "—";
    emailEl.href = employee.email ? `mailto:${employee.email}` : "#";
  }

  const phoneEl = document.getElementById("employeePhone");
  if (phoneEl) {
    phoneEl.textContent = employee.phone || "—";
    phoneEl.href = employee.phone ? `tel:${employee.phone.replace(/\s/g, "")}` : "#";
  }

  const avatarLinkEl = document.getElementById("employeeAvatarLink");
  if (avatarLinkEl) {
    if (employee.avatar) {
      avatarLinkEl.textContent = "Voir l'image";
      avatarLinkEl.href = employee.avatar;
    } else {
      avatarLinkEl.textContent = "—";
      avatarLinkEl.href = "#";
    }
  }

  document.title = `${employee.name} — NovaCorp`;
}

function fillEditForm(employee) {
  document.getElementById("editName").value = employee.name || "";
  document.getElementById("editEmail").value = employee.email || "";
  document.getElementById("editJob").value = employee.job || "";
  document.getElementById("editPhone").value = employee.phone || "";
  document.getElementById("editSex").value = employee.sex || "";
  document.getElementById("editAddress").value = employee.address || "";
  document.getElementById("editBirthDate").value = birthDateToInput(employee.birth_date);
  document.getElementById("editAvatar").value = employee.avatar || "";
}

function getFormData() {
  return {
    id: currentEmployee.id,
    name: document.getElementById("editName").value.trim(),
    email: document.getElementById("editEmail").value.trim(),
    job: document.getElementById("editJob").value.trim(),
    phone: document.getElementById("editPhone").value.trim(),
    sex: document.getElementById("editSex").value.trim(),
    address: document.getElementById("editAddress").value.trim(),
    birth_date: inputToBirthDate(document.getElementById("editBirthDate").value),
    avatar: document.getElementById("editAvatar").value.trim(),
    createdAt: currentEmployee.createdAt,
  };
}

function openEditModal() {
  if (!currentEmployee) return;
  fillEditForm(currentEmployee);
  document.getElementById("editModal")?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeEditModal() {
  document.getElementById("editModal")?.classList.add("hidden");
  document.body.style.overflow = "";
}

function initEditModal() {
  const modal = document.getElementById("editModal");
  const form = document.getElementById("editForm");
  if (!modal || !form) return;

  document.getElementById("editEmployeeBtn")?.addEventListener("click", openEditModal);
  document.getElementById("editEmployeeBtnFooter")?.addEventListener("click", openEditModal);
  document.getElementById("closeModalBtn")?.addEventListener("click", closeEditModal);
  document.getElementById("cancelEditBtn")?.addEventListener("click", closeEditModal);
  document.getElementById("modalBackdrop")?.addEventListener("click", closeEditModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeEditModal();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!currentEmployee) return;

    const saveBtn = document.getElementById("saveEditBtn");
    const originalText = saveBtn.textContent;
    saveBtn.disabled = true;
    saveBtn.textContent = "Enregistrement…";

    try {
      const updatedData = getFormData();
      await updateEmployee(currentEmployee.id, updatedData);

      currentEmployee = { ...currentEmployee, ...updatedData };
      renderEmployeeDetail(currentEmployee);
      closeEditModal();
      showFeedback("Profil mis à jour avec succès.", "success");
    } catch (err) {
      console.error(err);
      showFeedback("Erreur lors de la mise à jour. Vérifiez l'URL de l'API.", "error");
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = originalText;
    }
  });
}

async function initEmployeeDetail() {
  const employeeId = getEmployeeIdFromUrl();
  const errorMessage = document.getElementById("errorMessage");

  if (!employeeId) {
    showDetailState("error");
    if (errorMessage) errorMessage.textContent = "Aucun identifiant d'employé fourni.";
    return;
  }

  showDetailState("loading");

  try {
    currentEmployee = await fetchEmployeeById(employeeId);
    renderEmployeeDetail(currentEmployee);
    initEditModal();
    showDetailState("success");
  } catch (err) {
    console.error(err);
    showDetailState("error");
    if (errorMessage) {
      errorMessage.textContent = "Cet employé n'existe pas ou n'a pas pu être chargé.";
    }
  }
}
