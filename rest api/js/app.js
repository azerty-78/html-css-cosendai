/**
 * Point d'entrée de l'application
 *
 * Ordre de chargement des scripts (dans index.html et employee.html) :
 *   1. api-config.js   → URLs et configuration
 *   2. utils.js        → fonctions utilitaires
 *   3. api-get.js      → GET  (lire)
 *   4. api-post.js     → POST (créer)
 *   5. api-put.js      → PUT  (modifier)
 *   6. api-delete.js   → DELETE (supprimer)
 *   7. nav.js          → menu mobile
 *   8. list-page.js    → logique page liste
 *   9. detail-page.js  → logique page détail
 *  10. app.js          → démarrage (ce fichier)
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();

  const isDetailPage = document.getElementById("employeeDetail") !== null;

  if (isDetailPage) {
    initEmployeeDetail();
  } else {
    initEmployeesList();
  }
});
