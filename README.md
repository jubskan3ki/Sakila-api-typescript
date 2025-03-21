# 🎬 API REST - Vidéo Club (Sakila)

**Auteur :** Juba Ait-adda  
**Dépôt GitLab :**

---

## 📝 Description

Ce projet est une **API RESTful** développée en **TypeScript** pour la gestion d’un **magasin de location de vidéos**, basé sur la base de données **Sakila**.  
Le développement a été réalisé sans frameworks tiers (NestJS, Next.js, etc.) en respectant les principes enseignés lors du cours.

L'API expose des routes CRUD complètes, sécurisées avec JWT et RBAC, permettant la gestion des **films**, **utilisateurs** et **acteurs**. Le tout est déployé sous **Docker** avec **MariaDB**.

---

## 📋 Fonctionnalités réalisées

| Fonctionnalité                                               | Statut |
| ------------------------------------------------------------ | :----: |
| Conteneur Docker fonctionnel                                 |   ✅   |
| Route `/info` (health check + test DB)                       |   ✅   |
| CRUD complet des films (+ documentation TSOA)                |   ✅   |
| Pagination sur la liste des films (`/films?page=1&limit=10`) |   ✅   |
| Routes RESTful des acteurs d’un film (`/films/:id/actors`)   |   ✅   |
| Authentification JWT avec scopes                             |   ✅   |
| RBAC : seuls les admins peuvent créer, modifier, supprimer   |   ✅   |
| Refresh Token (gestion simple d'un token d’accès long)       |   ✅   |
| 📦 Export Postman                                            |   ✅   |
| 📚 Documentation Swagger (/docs)                             |   ✅   |

❌ **Fonctionnalités non incluses**

- Upload / Download d’images de couverture de film
- Route publique GraphQL listant les films et leurs acteurs

---

## 🚀 Instructions de déploiement et d'utilisation

### 1️⃣ Prérequis

- Docker & Docker Compose installés sur la machine locale.

### 2️⃣ Cloner le projet

```bash
git clone [lien vers ton repo gitlab]
cd [nom-du-dossier]
```

### 3️⃣ Lancer le projet avec Docker Compose

```bash
docker-compose up --build
```

- L'API sera accessible à l'adresse : `http://localhost:5050`
- La base de données MariaDB est exposée sur le port `3306`.

### 6️⃣ Tester avec Postman

Une **collection Postman** est fournie dans le fichier `postman.json`.

---

## 📮 Endpoints disponibles

### 🔑 Authentification

- `POST /auth/login` → récupère un JWT.
- `GET /auth/authorize?jwt=xxx` → récupère un access_token après vérification.

### 👤 Users

- `PUT /users` → créer un utilisateur.
- `GET /users` → liste paginée des utilisateurs (auth requise).
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`

### 🎞️ Films

- `GET /films` → pagination avec `page` et `limit`.
- `GET /films/:filmId`
- `PUT /films` → création (admin uniquement).
- `PATCH /films/:filmId` → mise à jour (admin uniquement).
- `DELETE /films/:filmId` → suppression (admin uniquement).

### 🎭 Acteurs

- `GET /films/:filmId/actors` → liste des acteurs d’un film.
- `GET /films/:filmId/actors/:actorId` → détail d’un acteur pour un film spécifique.

---

## ✅ Conformité et exigences respectées

| Critères                                           | Statut |
| -------------------------------------------------- | ------ |
| API REST JSON uniquement                           | ✅     |
| Respect des bonnes pratiques REST (routes/actions) | ✅     |
| Authentification JWT RS256 avec scopes TSOA        | ✅     |
| RBAC : seuls les admins peuvent gérer les films    | ✅     |
| Pagination sur la liste des films                  | ✅     |
| Docker multi-container (API + MariaDB)             | ✅     |
| Aucun framework tiers (Nest, Symfony, etc.)        | ✅     |
| API Stateless (pas de session côté serveur)        | ✅     |
| Logs clairs et gestion des erreurs pertinentes     | ✅     |
| Documentation générée automatiquement avec TSOA    | ✅     |
| Export Postman pour faciliter l'évaluation         | ✅     |
