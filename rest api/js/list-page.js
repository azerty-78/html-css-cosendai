/**
 * Page liste (index.html)
 * Utilise api-get.js → fetchEmployees() pour remplir le tableau
 */

function renderEmployeeRow(employee) {
  const row = document.createElement("tr");
  row.className = "employee-row";

  row.innerHTML = `
    <td data-label="Matricule"><span class="cell-id">#${employee.id}</span></td>
    <td data-label="Employé">
      <div class="cell-employee">
        ${renderAvatarCell(employee)}
        <span class="cell-name">${employee.name}</span>
      </div>
    </td>
    <td data-label="Email"><a class="cell-email" href="mailto:${employee.email || ""}">${employee.email || "—"}</a></td>
    <td data-label="Poste">${employee.job || "—"}</td>
    <td data-label="Téléphone">${employee.phone || "—"}</td>
    <td data-label="Action">
      <a class="btn-table" href="employee.html?id=${employee.id}">Voir le profil</a>
    </td>
  `;

  row.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    window.location.href = `employee.html?id=${employee.id}`;
  });

  return row;
}

function showListState(state) {
  const loading = document.getElementById("loadingState");
  const error = document.getElementById("errorState");
  const tableWrap = document.getElementById("employeesTableWrap");

  if (loading) loading.classList.toggle("hidden", state !== "loading");
  if (error) error.classList.toggle("hidden", state !== "error");
  if (tableWrap) tableWrap.classList.toggle("hidden", state !== "success");
}

async function initEmployeesList() {
  const tableBody = document.getElementById("employeesTableBody");
  const countEl = document.getElementById("employeesCount");
  const retryBtn = document.getElementById("retryBtn");

  if (!tableBody) return;

  showListState("loading");

  try {
    const employees = await fetchEmployees();

    tableBody.innerHTML = "";
    employees.forEach((employee) => {
      tableBody.appendChild(renderEmployeeRow(employee));
    });

    if (countEl) {
      const n = employees.length;
      countEl.textContent = `${n} employé${n > 1 ? "s" : ""} chez ${COMPANY_NAME}`;
    }

    showListState("success");
  } catch (err) {
    console.error(err);
    showListState("error");
  }

  if (retryBtn) {
    retryBtn.onclick = initEmployeesList;
  }
}
