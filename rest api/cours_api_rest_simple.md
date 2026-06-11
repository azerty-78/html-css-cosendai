# 🌐 Cours React - API REST

> **Comprendre et utiliser les API REST en React**  
> Explication simple et rapide des concepts essentiels

---

## 📖 Table des Matières

1. [Qu'est-ce qu'une API REST ?](#1-quest-ce-quune-api-rest)
2. [Les Méthodes HTTP (CRUD)](#2-les-méthodes-http-crud)
3. [Structure d'une Requête API](#3-structure-dune-requête-api)
4. [Fetch API en JavaScript](#4-fetch-api-en-javascript)
5. [Async/Await](#5-asyncawait)
6. [Intégration avec React](#6-intégration-avec-react)
7. [Gestion des Erreurs](#7-gestion-des-erreurs)
8. [Bonnes Pratiques](#8-bonnes-pratiques)

---

## 1. Qu'est-ce qu'une API REST ?

### **Définition Simple**

Une **API REST** (Application Programming Interface - Representational State Transfer) est un moyen de **communication** entre votre application React (frontend) et un serveur (backend).

### **Analogie du Restaurant**

Imaginez un restaurant :

- **Vous** = React (Frontend)
- **Le serveur** = API
- **La cuisine** = Base de données (Backend)
- **Le menu** = Documentation de l'API

**Processus :**
1. Vous consultez le menu (documentation)
2. Vous passez commande au serveur (requête HTTP)
3. Le serveur transmet en cuisine (traitement)
4. La cuisine prépare (base de données)
5. Le serveur vous apporte le plat (réponse)

### **Pourquoi REST ?**

- ✅ **Standard universel** : Fonctionne avec tous les langages
- ✅ **Simple** : Utilise HTTP (comme le web)
- ✅ **Stateless** : Chaque requête est indépendante
- ✅ **Format JSON** : Facile à manipuler en JavaScript

### **Exemple d'URL API**

```
https://api.example.com/articles
https://api.example.com/articles/123
https://api.example.com/users
```

---

## 2. Les Méthodes HTTP (CRUD)

### **CRUD = Create, Read, Update, Delete**

Les 4 opérations de base pour manipuler des données.

| Opération | Méthode HTTP | Action | Exemple |
|-----------|--------------|--------|---------|
| **Create** | POST | Créer une nouvelle donnée | Ajouter un article |
| **Read** | GET | Lire/Récupérer des données | Afficher la liste |
| **Update** | PUT / PATCH | Modifier une donnée existante | Modifier un article |
| **Delete** | DELETE | Supprimer une donnée | Supprimer un article |

### **Explication Détaillée**

#### **GET - Lire les données**

```
GET /api/articles          → Récupérer tous les articles
GET /api/articles/123      → Récupérer l'article avec l'ID 123
```

**Caractéristiques :**
- Ne modifie **RIEN** sur le serveur
- Peut être mis en cache
- Idempotent (répéter 100 fois = même résultat)

#### **POST - Créer des données**

```
POST /api/articles         → Créer un nouvel article
```

**Caractéristiques :**
- Envoie des données dans le **body** de la requête
- Modifie le serveur (ajoute une donnée)
- Retourne généralement la donnée créée

#### **PUT - Modifier complètement**

```
PUT /api/articles/123      → Remplacer l'article 123
```

**Caractéristiques :**
- Remplace **TOUTES** les propriétés
- Doit envoyer l'objet complet
- Idempotent

#### **PATCH - Modifier partiellement**

```
PATCH /api/articles/123    → Modifier certains champs de l'article 123
```

**Caractéristiques :**
- Modifie **seulement** les champs envoyés
- Plus efficace que PUT

#### **DELETE - Supprimer**

```
DELETE /api/articles/123   → Supprimer l'article 123
```

**Caractéristiques :**
- Supprime la ressource
- Retourne généralement 204 (No Content)
- Idempotent

---

## 3. Structure d'une Requête API

### **Composants d'une Requête HTTP**

```
[MÉTHODE] [URL] [VERSION HTTP]
[HEADERS]

[BODY]
```

### **Exemple Concret**

```http
POST https://api.example.com/articles HTTP/1.1
Content-Type: application/json
Authorization: Bearer token123

{
  "nom": "Ordinateur",
  "prix": 500000
}
```

### **Les Headers (En-têtes)**

Métadonnées sur la requête :

```javascript
{
  'Content-Type': 'application/json',    // Type de données envoyées
  'Authorization': 'Bearer token123',    // Authentification
  'Accept': 'application/json'           // Type de réponse attendue
}
```

### **Le Body (Corps)**

Données envoyées au serveur (pour POST, PUT, PATCH) :

```javascript
{
  "nom": "Nouvel Article",
  "description": "Description complète",
  "quantite": 10,
  "prix": 25000
}
```

### **La Réponse**

**Structure :**
```
[CODE STATUS]
[HEADERS]

[BODY]
```

**Codes de Statut Courants :**

| Code | Signification | Exemple |
|------|---------------|---------|
| 200 | OK | Succès |
| 201 | Created | Ressource créée |
| 204 | No Content | Suppression réussie |
| 400 | Bad Request | Données invalides |
| 401 | Unauthorized | Non authentifié |
| 404 | Not Found | Ressource introuvable |
| 500 | Server Error | Erreur serveur |

---

## 4. Fetch API en JavaScript

### **Qu'est-ce que Fetch ?**

`fetch()` est la fonction JavaScript **native** pour faire des appels API.

### **Syntaxe de Base**

```javascript
fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### **GET - Récupérer des Données**

```javascript
// Simple GET
fetch('https://api.example.com/articles')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Tableau d'articles
  })
  .catch(error => {
    console.error('Erreur:', error);
  });
```

### **POST - Créer des Données**

```javascript
fetch('https://api.example.com/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nom: 'Nouvel Article',
    prix: 5000
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('Créé:', data);
  });
```

### **PUT - Modifier des Données**

```javascript
fetch('https://api.example.com/articles/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nom: 'Article Modifié',
    prix: 6000
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('Modifié:', data);
  });
```

### **DELETE - Supprimer des Données**

```javascript
fetch('https://api.example.com/articles/123', {
  method: 'DELETE'
})
  .then(response => {
    if (response.ok) {
      console.log('Supprimé avec succès');
    }
  });
```

---

## 5. Async/Await

### **Qu'est-ce qu'Async/Await ?**

Une syntaxe plus **claire et lisible** pour gérer les promesses.

### **Comparaison : Then vs Async/Await**

**Avec .then() (ancien style) :**
```javascript
function getArticles() {
  fetch('https://api.example.com/articles')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}
```

**Avec async/await (moderne) :**
```javascript
async function getArticles() {
  try {
    const response = await fetch('https://api.example.com/articles');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### **Les 4 Opérations CRUD avec Async/Await**

```javascript
const API_URL = 'https://api.example.com';

// GET - Lire
async function getArticles() {
  const response = await fetch(`${API_URL}/articles`);
  const data = await response.json();
  return data;
}

// POST - Créer
async function createArticle(article) {
  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article)
  });
  const data = await response.json();
  return data;
}

// PUT - Modifier
async function updateArticle(id, article) {
  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article)
  });
  const data = await response.json();
  return data;
}

// DELETE - Supprimer
async function deleteArticle(id) {
  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: 'DELETE'
  });
  return response.ok;
}
```

---

## 6. Intégration avec React

### **Où Faire les Appels API en React ?**

**Dans `useEffect` pour charger au montage :**

```javascript
import { useState, useEffect } from 'react';

function ListeArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour charger les articles
    const loadArticles = async () => {
      try {
        const response = await fetch('https://api.example.com/articles');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []); // [] = une seule fois au montage

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>{article.nom}</div>
      ))}
    </div>
  );
}
```

### **Dans une Fonction (pour créer, modifier, supprimer) :**

```javascript
import { useState } from 'react';

function FormulaireArticle() {
  const [nom, setNom] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api.example.com/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom })
      });
      
      const data = await response.json();
      console.log('Créé:', data);
      
      // Réinitialiser le formulaire
      setNom('');
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Envoi...' : 'Créer'}
      </button>
    </form>
  );
}
```

---

## 7. Gestion des Erreurs

### **Vérifier le Statut de la Réponse**

```javascript
async function getArticles() {
  try {
    const response = await fetch('https://api.example.com/articles');
    
    // Vérifier si la requête a réussi
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur:', error.message);
    throw error; // Propager l'erreur
  }
}
```

### **Gestion Complète dans React**

```javascript
function ListeArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://api.example.com/articles');
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement');
        }
        
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur: {error}</p>;

  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>{article.nom}</div>
      ))}
    </div>
  );
}
```

---

## 8. Bonnes Pratiques

### **1. Créer un Service API Séparé**

**src/services/api.js**
```javascript
const API_URL = 'https://api.example.com';

export const api = {
  // GET
  getArticles: async () => {
    const response = await fetch(`${API_URL}/articles`);
    if (!response.ok) throw new Error('Erreur GET');
    return response.json();
  },

  // POST
  createArticle: async (article) => {
    const response = await fetch(`${API_URL}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    });
    if (!response.ok) throw new Error('Erreur POST');
    return response.json();
  },

  // PUT
  updateArticle: async (id, article) => {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    });
    if (!response.ok) throw new Error('Erreur PUT');
    return response.json();
  },

  // DELETE
  deleteArticle: async (id) => {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erreur DELETE');
    return response.ok;
  }
};
```

**Utilisation dans un composant :**
```javascript
import { api } from './services/api';

function MonComposant() {
  useEffect(() => {
    const loadData = async () => {
      const articles = await api.getArticles();
      setArticles(articles);
    };
    loadData();
  }, []);
}
```

### **2. Toujours Gérer les 3 États**

```javascript
const [data, setData] = useState(null);      // Les données
const [loading, setLoading] = useState(true); // Chargement en cours
const [error, setError] = useState(null);     // Erreur éventuelle
```

### **3. Utiliser Try/Catch/Finally**

```javascript
try {
  setLoading(true);
  const data = await api.getArticles();
  setData(data);
  setError(null);
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false); // Toujours exécuté
}
```

### **4. Éviter les Appels Multiples**

```javascript
// ❌ FAUX - Charge les données à chaque rendu
useEffect(() => {
  loadData();
}); // Pas de tableau de dépendances

// ✅ CORRECT - Charge une seule fois
useEffect(() => {
  loadData();
}, []); // Tableau vide
```

### **5. Nettoyer les Requêtes en Cours**

```javascript
useEffect(() => {
  let cancelled = false;

  const loadData = async () => {
    const data = await api.getArticles();
    if (!cancelled) {
      setArticles(data);
    }
  };

  loadData();

  // Cleanup : annuler si le composant est détruit
  return () => {
    cancelled = true;
  };
}, []);
```

### **6. Variables d'Environnement**

**Créer `.env` à la racine du projet :**
```
REACT_APP_API_URL=https://api.example.com
```

**Utilisation :**
```javascript
const API_URL = process.env.REACT_APP_API_URL;

fetch(`${API_URL}/articles`);
```

---

## 📊 Résumé Rapide

| Concept | Utilité |
|---------|---------|
| **API REST** | Communication frontend ↔ backend |
| **GET** | Récupérer des données |
| **POST** | Créer des données |
| **PUT/PATCH** | Modifier des données |
| **DELETE** | Supprimer des données |
| **fetch()** | Fonction pour appeler l'API |
| **async/await** | Syntaxe moderne pour les promesses |
| **useEffect** | Charger les données au montage |
| **try/catch** | Gérer les erreurs |

---

## ✅ Checklist

- [ ] Je comprends ce qu'est une API REST
- [ ] Je connais les 4 méthodes HTTP (GET, POST, PUT, DELETE)
- [ ] Je sais utiliser fetch()
- [ ] Je comprends async/await
- [ ] Je sais où placer les appels API dans React
- [ ] Je gère les états loading et error
- [ ] Je sais créer un service API séparé

---

**Vous êtes maintenant prêt à travailler avec des API en React ! 🚀**