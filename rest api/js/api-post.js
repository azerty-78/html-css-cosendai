/**
 * POST — Créer un nouvel enregistrement dans l'API
 *
 * Principe :
 *   fetch(url, { method: "POST", headers, body })
 *   - headers : indique que le corps est du JSON
 *   - body    : objet converti en texte JSON avec JSON.stringify()
 *
 * Endpoint :
 *   POST /users  → ajoute un nouvel employé
 *
 * Note : pas encore utilisé dans l'interface, mais prêt pour un futur formulaire "Ajouter".
 */

async function createEmployee(data) {
  const url = buildApiUrl(API_CONFIG.endpoints.create);

  const response = await fetch(url, {
    method: API_CONFIG.methods.create,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Échec de la création de l'employé");
  }

  return response.json();
}
