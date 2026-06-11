/**
 * DELETE — Supprimer un enregistrement
 *
 * Principe :
 *   fetch(url, { method: "DELETE" })
 *   Pas de body nécessaire — l'id dans l'URL suffit
 *
 * Endpoint :
 *   DELETE /users/:id  → supprime l'employé
 *
 * Note : pas encore branché à un bouton, mais prêt à l'emploi.
 */

async function deleteEmployee(id) {
  const url = buildApiUrl(API_CONFIG.endpoints.delete(id));

  const response = await fetch(url, {
    method: API_CONFIG.methods.delete,
  });

  if (!response.ok) {
    throw new Error("Échec de la suppression de l'employé");
  }

  return response.json();
}
