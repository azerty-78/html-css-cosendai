/**
 * Configuration de l'API REST (MockAPI)
 * Tous les fichiers api-*.js utilisent ces constantes.
 */

const API_CONFIG = {
  base: "https://6a2a5ef8b687a7d5cbc3976d.mockapi.io/employees",
  endpoints: {
    list: "/users",
    get: (id) => `/users/${id}`,
    create: "/users",
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
  },
  methods: {
    create: "POST",
    update: "PUT",
    delete: "DELETE",
  },
};

const COMPANY_NAME = "NovaCorp";

/** Construit l'URL complète : base + chemin */
function buildApiUrl(endpoint) {
  return `${API_CONFIG.base}${endpoint}`;
}
