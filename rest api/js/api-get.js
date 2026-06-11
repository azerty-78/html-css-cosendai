/**
 * GET — Lire des données depuis l'API
 *
 * Principe :
 *   fetch(url) sans options → méthode GET par défaut
 *   La réponse est convertie en objet JS avec response.json()
 *
 * Endpoints utilisés :
 *   GET /users       → tous les employés (page liste)
 *   GET /users/:id   → un employé (page détail)
 */

/** GET /users — récupère la liste complète des employés */
async function fetchEmployees() {
  const url = buildApiUrl(API_CONFIG.endpoints.list);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des employés");
  }

  return response.json();
}

/** GET /users/:id — récupère un employé par son identifiant */
async function fetchEmployeeById(id) {
  const url = buildApiUrl(API_CONFIG.endpoints.get(id));

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Employé introuvable");
  }

  return response.json();
}
