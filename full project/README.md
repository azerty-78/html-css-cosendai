# Mini Projet E-commerce (HTML, CSS, JavaScript)

Ce projet est un mini site e-commerce conçu pour des débutants.
L'objectif est d'apprendre à structurer une application web simple avec :
- HTML (structure),
- CSS (style),
- JavaScript (interactions, logique, données JSON).

---

## 1) Structure du projet

```text
full project/
├─ index1.html        # Page principale (boutique)
├─ index2.html        # Page de connexion
├─ style.css          # Styles globaux
├─ shop.js            # Logique e-commerce (catalogue/panier)
├─ auth.js            # Logique connexion
├─ products.json      # Base JSON des produits
├─ users.json         # Base JSON des utilisateurs
└─ README.md          # Documentation du projet
```

---

## 2) Fonctionnalités disponibles

### Boutique (`index1.html`)
- Affichage des produits depuis `products.json`
- Affichage des images produit
- Filtre par catégorie
- Recherche par nom
- Tri des prix (croissant / décroissant)
- Ajout au panier
- Gestion quantité (`+` / `-`)
- Suppression d'un article
- Vidage du panier
- Total automatique en **XAF**
- Sauvegarde du panier avec `localStorage`
- Badge compteur panier dans le header

### Authentification (`index2.html`)
- Formulaire de connexion simple
- Vérification des identifiants depuis `users.json`
- Message succès / erreur
- Fallback local dans `auth.js` si `users.json` ne charge pas

---

## 3) Notions JavaScript utilisées

Ce projet couvre plusieurs notions importantes :
- Variables et tableaux
- Fonctions
- Boucles `for`
- Conditions `if`
- `switch`
- Manipulation du DOM (`getElementById`, `createElement`, `innerHTML`)
- Événements (`click`, `change`, `input`)
- Méthodes de tableau (`find`, `filter`, `map`, `forEach`, `some`)
- `fetch` + `async/await`
- `try...catch`
- `localStorage`

---

## 4) Notions CSS utilisées

- Layout simple avec `grid` et sections
- Header / footer structurés
- Boutons, tableaux, formulaires
- Cartes produit
- Design responsive de base
- Couleurs via variables CSS (`:root`)

---

## 5) Identifiants de test (connexion)

Dans `users.json`, tu as 5 utilisateurs.
Exemple :
- Email: `amina@mail.com`
- Mot de passe: `1234`

---

## 6) Exercices proposés aux étudiants

1. Ajouter un nouveau produit dans `products.json`.
2. Ajouter une catégorie et vérifier le filtre.
3. Ajouter une réduction (`-10%`) sur un produit précis.
4. Afficher le nombre d'articles total dans le footer.
5. Ajouter une page `checkout.html` avec formulaire de commande.
6. Ajouter une fonctionnalité "favoris" avec `localStorage`.

---

## 7) Bonnes pratiques pédagogiques

- Lire d'abord `index1.html` pour comprendre la structure.
- Ensuite lire `shop.js` fonction par fonction.
- Tester chaque action dans le navigateur.
- Modifier une petite partie à la fois.
- Garder le code simple et bien commenté.

---

## 8) Évolutions possibles

- Dashboard après connexion
- Déconnexion + session utilisateur
- Détail produit (`product.html`)
- Checkout simplifié
- Validation plus avancée des formulaires

---

Projet conçu pour apprendre pas à pas : **simple, lisible, et pratique**.
