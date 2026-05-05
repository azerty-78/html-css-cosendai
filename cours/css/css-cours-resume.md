# Cours Resume CSS

## 1) CSS : definition rapide

**CSS** (Cascading Style Sheets) est le langage qui gere la **presentation visuelle** d'une page web :
- couleurs
- tailles
- espacements
- alignements
- mise en page responsive
- animations

Si HTML structure le contenu, CSS le met en forme.

---

## 2) Origine et evolution

- CSS est propose en 1994 par **Hakon Wium Lie**.
- Standardise par le **W3C**.
- Evolution par "niveaux/modules" (CSS1, CSS2, CSS3 puis modules modernes).
- Aujourd'hui, CSS evolue en continu (Flexbox, Grid, variables CSS, media queries, etc.).

---

## 3) Type de langage

CSS n'est **pas** un langage de programmation generaliste :
- pas de boucles classiques `for/while` (hors preprocesseurs comme Sass)
- pas de fonctions metier comme JS
- pas de compilation obligatoire

CSS est un **langage declaratif de style** :
- on declare **ce qu'on veut** visuellement
- le navigateur decide **comment l'appliquer**

---

## 4) Integration de CSS dans un projet

### a) Inline (dans une balise HTML)

```html
<p style="color: blue;">Texte</p>
```

Usage ponctuel uniquement.

### b) Interne (dans `<style>` dans le `<head>`)

```html
<style>
  p { color: blue; }
</style>
```

Bien pour tests/petites pages.

### c) Externe (fichier `.css`) - recommande

```html
<link rel="stylesheet" href="styles.css">
```

Meilleure maintenabilite, reutilisable, propre.

---

## 5) Syntaxe CSS

```css
selecteur {
  propriete: valeur;
  propriete2: valeur2;
}
```

Exemple :

```css
h1 {
  color: #1e90ff;
  font-size: 32px;
}
```

---

## 6) Les selecteurs essentiels

## Universel
```css
* { box-sizing: border-box; }
```

## Balise
```css
p { color: gray; }
```

## Classe
```css
.btn { padding: 10px; }
```

## ID
```css
#header { background: black; }
```

## Attribut
```css
input[type="text"] { border: 1px solid #ccc; }
```

## Descendant
```css
article p { line-height: 1.6; }
```

## Enfant direct
```css
ul > li { list-style: square; }
```

## Frere adjacent
```css
h2 + p { margin-top: 0; }
```

## Etats (pseudo-classes)
```css
a:hover { color: red; }
input:focus { outline: 2px solid blue; }
```

## Pseudo-elements
```css
p::first-letter { font-size: 2rem; }
```

---

## 7) Cascade, specificite, heritage (logique fondamentale)

### a) Cascade
Plusieurs regles peuvent viser le meme element. CSS choisit selon :
1. priorite (`!important`, inline, id, classe, balise)
2. ordre dans le fichier (la derniere regle gagne a specificite egale)

### b) Specificite (du plus fort au plus faible)
- `style=""` inline
- `#id`
- `.classe`, `[attribut]`, `:hover`
- `balise`, `::before`

### c) Heritage
Certaines proprietes se transmettent aux enfants (`color`, `font-family`), d'autres non (`margin`, `border`).

---

## 8) La logique des proprietes CSS (comment raisonner)

Pour ne pas se perdre, penser en blocs :

### 1. Typographie
- `font-family`
- `font-size`
- `font-weight`
- `line-height`
- `text-align`

### 2. Boite (Box Model)
- `width`, `height`
- `padding` (interieur)
- `border`
- `margin` (exterieur)

### 3. Couleurs et fonds
- `color`
- `background-color`
- `background-image`
- `opacity`

### 4. Positionnement
- `display`
- `position` (`static`, `relative`, `absolute`, `fixed`, `sticky`)
- `top/right/bottom/left`
- `z-index`

### 5. Mise en page moderne
- **Flexbox** (alignement 1D)
- **Grid** (mise en page 2D)

### 6. Responsive
- `@media`
- unites relatives (`%`, `em`, `rem`, `vw`, `vh`)
- approche mobile-first

---

## 9) Box model (a retenir absolument)

Taille totale d'un element =  
`content + padding + border + margin`

Tres utile :

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Avec `border-box`, largeur/hauteur incluent padding + border.

---

## 10) Flexbox et Grid (raccourci mental)

### Flexbox
Pour aligner des elements sur **une dimension** (ligne ou colonne).

Proprietes cle :
- `display: flex`
- `justify-content`
- `align-items`
- `gap`
- `flex-wrap`

### Grid
Pour organiser une page sur **deux dimensions** (lignes + colonnes).

Proprietes cle :
- `display: grid`
- `grid-template-columns`
- `grid-template-rows`
- `gap`
- `grid-column`, `grid-row`

---

## 11) Integration avec JavaScript

JavaScript peut modifier le CSS via :
- changement de classes (`classList.add/remove/toggle`)
- modification de style inline (`element.style.color = "red"`)

Bonne pratique : privilegier la gestion de classes.

---

## 12) Bonnes pratiques solides

- Utiliser un fichier CSS externe.
- Nommer les classes clairement (`.card-title`, `.btn-primary`).
- Eviter les selecteurs trop longs.
- Eviter `!important` sauf cas exceptionnel.
- Regrouper les regles par composants.
- Utiliser des variables CSS pour les couleurs/espacements.
- Tester en responsive des le debut.
- Garder une coherence visuelle (palette, typo, espacements).

Exemple variables :

```css
:root {
  --primary: #2563eb;
  --radius: 8px;
  --space: 1rem;
}
```

---

## 13) Mini fiche memoire (revision rapide)

- CSS = style visuel du HTML.
- Syntaxe = `selecteur { propriete: valeur; }`
- Comprendre la cascade + specificite.
- Maitriser le box model.
- Utiliser Flexbox et Grid pour la mise en page.
- Utiliser media queries pour le responsive.
- Ecrire un CSS lisible, reutilisable, coherent.

---

## 14) Plan d'apprentissage conseille

1. Syntaxe + selecteurs  
2. Box model + display + position  
3. Typographie + couleurs + fonds  
4. Flexbox  
5. Grid  
6. Responsive (`@media`)  
7. Animations/transitions  
8. Organisation propre du code CSS

Ce plan permet de progresser vite tout en gardant une base solide.
