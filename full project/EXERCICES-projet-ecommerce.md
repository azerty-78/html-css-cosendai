# Exercices — Mini projet e-commerce (HTML, CSS, JavaScript)

---

## 1) Contexte du projet

Vous travaillez pour une **boutique en ligne fictive** (« Boutique Demo » ou le nom de votre choix). Les clients doivent pouvoir :

- parcourir un **catalogue de produits** (nom, catégorie, prix en **XAF**, image) ;
- **filtrer** par catégorie, **rechercher** par mot-clé, **trier** les prix ;
- **ajouter des articles au panier**, modifier les quantités, supprimer une ligne ou vider tout le panier ;
- voir le **total** du panier ;
- **se connecter** avec un email et un mot de passe vérifiés contre une petite base **JSON** d’utilisateurs.

Tout doit rester **volontairement simple** : pas de framework, pas de backend obligatoire — uniquement fichiers statiques + JavaScript dans le navigateur.

---

## 2) Ce dont vous aurez besoin (prérequis)

- Savoir structurer une page **HTML5** (`header`, `main`, `footer`, sections, formulaires, tableaux).
- Savoir lier un fichier **CSS** externe et styliser des blocs, boutons, grilles simples.
- Connaître les bases du **JavaScript** :
  - variables, tableaux, objets ;
  - fonctions, boucles (`for`), conditions (`if`), `switch` ;
  - DOM : `getElementById`, `createElement`, `innerHTML` ou `textContent` ;
  - événements : `click`, `change`, `input` ;
  - `fetch`, `async` / `await`, `try` / `catch` ;
  - `JSON.parse` / `JSON.stringify` ;
  - `localStorage` (optionnel mais recommandé pour le panier).

---

## 3) Fichiers à créer (obligatoire)

Créez un dossier projet (par ex. `mon-ecommerce/`) et les fichiers suivants :

| Fichier | Rôle |
|--------|------|
| `index.html` (ou `index1.html`) | Page **boutique** : accueil, catalogue, panier, infos, navigation vers la connexion. |
| `connexion.html` (ou `index2.html`) | Page **connexion** : formulaire email + mot de passe, messages succès/erreur. |
| `style.css` | Tous les styles (layout, cartes produits, tableau panier, header/footer). |
| `shop.js` | Logique boutique : chargement produits, filtres, panier, total, compteur éventuel. |
| `auth.js` | Logique connexion : chargement utilisateurs, vérification des identifiants. |
| `products.json` | Liste des produits : au minimum `id`, `name`, `category`, `price`, `image` (URL d’image). |
| `users.json` | Liste d’utilisateurs : au minimum `id`, `fullName`, `email`, `password` (démo uniquement). |

**Bonus (non obligatoire au départ)** : `README.md` pour décrire le projet.

---

## 4) Questions / exercices par étape

### Partie A — Structure HTML

1. **Quelles sections** allez-vous placer dans le `<main>` de la page boutique pour séparer accueil, catalogue, panier et informations pratiques ?
2. Pourquoi est-il pertinent d’avoir un **`<header>`** avec navigation et un **`<footer>`** avec liens et copyright ?
3. Où placez-vous la balise **`<script src="...">`** pour charger `shop.js` sans bloquer inutilement l’affichage de la page ?

### Partie B — Données JSON

4. Proposez la **structure JSON** d’un produit avec les champs : `id`, `name`, `category`, `price`, `image`.
5. Créez au moins **5 produits** dans `products.json` répartis dans **au moins 3 catégories** différentes.
6. Créez **5 utilisateurs** dans `users.json`. Pourquoi en démo ne faut-il **jamais** réutiliser de vrais mots de passe en production ?

### Partie C — CSS

7. Comment affichez-vous les produits en **grille** (plusieurs cartes par ligne) avec un CSS simple ?
8. Quels styles minimum donnez-vous aux **boutons** « Ajouter au panier » et aux **champs** de formulaire pour une interface lisible ?
9. Comment stylisez-vous le **tableau du panier** (bordures, en-têtes, espacement) ?

### Partie D — JavaScript boutique (`shop.js`)

10. Comment chargez-vous `products.json` avec **`fetch`** et que faites-vous si la requête échoue (ex. fallback avec un tableau en dur) ?
11. Écrivez une fonction **`formatPrice(prix)`** qui affiche le prix suivi de ` XAF`.
12. Comment remplissez-vous dynamiquement un **`<select>`** des catégories à partir des produits chargés ?
13. Implémentez la **recherche** : filtrer les produits dont le nom contient le texte saisi (insensible à la casse).
14. Implémentez le **tri** des prix : croissant et décroissant (vous pouvez utiliser `sort` ou une boucle + `switch` pour le mode choisi).
15. Comment ajoutez-vous un produit au **panier** : même article plusieurs fois = quantité augmentée ?
16. Affichez le panier dans un **`<table>`** : colonnes article, prix unitaire, quantité, sous-total, action (boutons + / − / supprimer).
17. Calculez le **total général** du panier avec une boucle `for`.
18. **Bonus** : sauvegardez le panier dans **`localStorage`** au changement et rechargez-le au chargement de la page.
19. **Bonus** : affichez un **compteur** du nombre total d’articles dans le lien « Panier » du menu.

### Partie E — JavaScript connexion (`auth.js`)

20. Chargez `users.json` comme pour les produits. Que vérifiez-vous à la soumission du formulaire (champs vides, email normalisé, couple email/mot de passe) ?
21. Affichez un message **succès** ou **erreur** dans la page sans `alert()`.
22. **Bonus** : après une connexion réussie, enregistrez le nom de l’utilisateur dans `sessionStorage` et redirigez vers une page « tableau de bord » (à créer si vous le souhaitez).

### Partie F — Synthèse

23. Listez **toutes les notions** du cours que vous avez utilisées (DOM, événements, boucles, `switch`, `fetch`, JSON, etc.).
24. Quelles **améliorations** proposeriez-vous pour une version 2 (checkout, fiche produit, stock) ?

---

## 5) Critères de réussite minimaux

Le projet est considéré comme réussi si :

- la page boutique affiche les produits à partir de **`products.json`** ;
- le panier fonctionne (ajout, quantités, suppression, total en **XAF**) ;
- la page connexion vérifie les utilisateurs depuis **`users.json`** ;
- le code est **commenté** aux endroits importants ;
- l’interface reste **simple et compréhensible**.

Bon travail.
