/**
 * PUT — Mettre à jour un enregistrement existant
 *
 * Principe :
 *   fetch(url, { method: "PUT", headers, body })
 *   L'id de l'employé est dans l'URL (/users/:id)
 *   Le corps contient toutes les données à enregistrer
 *
 * Endpoint :
 *   PUT /users/:id  → modifie l'employé (formulaire sur employee.html)
 */

async function updateEmployee(id, data) {
  const url = buildApiUrl(API_CONFIG.endpoints.update(id));

  const response = await fetch(url, {
    method: API_CONFIG.methods.update,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Échec de la mise à jour de l'employé");
  }

  return response.json();
}
