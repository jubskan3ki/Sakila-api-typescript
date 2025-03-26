# 🎬 API REST - Vidéo Club (Sakila)

**Auteur :** Juba Ait-adda  
**Dépôt GitLab :** https://github.com/jubskan3ki/sakila-api-typescript

---

## 📝 Description

Ce projet est une **API RESTful** développée en **TypeScript** pour la gestion d’un **magasin de location de vidéos**, basé sur la base de données **Sakila**.  
Le développement a été réalisé sans frameworks tiers (NestJS, Next.js, etc.) en respectant les principes enseignés lors du cours.

L'API expose des routes CRUD complètes, sécurisées avec JWT et RBAC, permettant la gestion des **films**, **utilisateurs** et **acteurs**. Le tout est déployé sous **Docker** avec **MariaDB**.

---

## 📋 Fonctionnalités réalisées

| Fonctionnalité                                             | Statut |
| ---------------------------------------------------------- | :----: |
| Conteneur Docker fonctionnel (API + DB)                    |   ✅   |
| Route `/info` (health check + test DB)                     |   ✅   |
| CRUD complet des films (+ documentation TSOA)              |   ✅   |
| Pagination des films (`/films?page=1&limit=10`)            |   ✅   |
| Liste des acteurs d’un film (`/films/:id/actors`)          |   ✅   |
| Authentification JWT + Refresh token                       |   ✅   |
| RBAC : seuls les admins peuvent créer, modifier, supprimer |   ✅   |
| Collection Postman prête à l’emploi                        |   ✅   |
| Documentation Swagger automatique `/docs`                  |   ✅   |

❌ **Fonctionnalités non incluses**

- Upload / Download d’images de couverture de film
- Route publique GraphQL listant les films et leurs acteurs

---

## 🚀 Instructions de déploiement et d'utilisation

### 1️⃣ Prérequis

- **Docker** et **Docker Compose** installés sur la machine.

---

### 2️⃣ Cloner le projet

```bash
git clone https://github.com/jubskan3ki/sakila-api-typescript
cd sakila-api-typescript
```

---

### 3️⃣ Lancer en **développement**

```bash
docker-compose -f docker-compose.dev.yml up --build
```

- API accessible sur : [http://localhost:5050](http://localhost:5050)
- Base de données MariaDB sur le port local `3307`.

---

### 4️⃣ Lancer en **production**

```bash
docker-compose -f docker-compose.prod.yml up --build
```

---

### 5️⃣ Données de connexion par défaut

La base de données `sakila` est initialisée automatiquement avec deux utilisateurs dans la table `users` :

| Prénom | Nom      | Email             | Mot de passe | Rôle   |
| ------ | -------- | ----------------- | ------------ | ------ |
| Pierre | Lerocher | admin@example.com | password     | admin  |
| Jeanne | D'Arc    | test@test.com     | password     | common |

> 🔐 Pense à modifier les mots de passe si déployé en ligne !

---

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

| Critère                                         | Statut |
| ----------------------------------------------- | ------ |
| API REST JSON uniquement                        | ✅     |
| Respect des bonnes pratiques RESTful            | ✅     |
| Authentification JWT RS256 avec scopes via TSOA | ✅     |
| RBAC (admin uniquement pour films)              | ✅     |
| Pagination                                      | ✅     |
| Docker multi-container (API + MariaDB)          | ✅     |
| Zéro framework (pas de NestJS / Symfony...)     | ✅     |
| API Stateless                                   | ✅     |
| Logs clairs et gestion des erreurs              | ✅     |
| Documentation Swagger automatique               | ✅     |
| Export Postman pour faciliter les tests         | ✅     |

---

## 📦 Structure des fichiers SQL

Le dossier `/database/` contient :

- `01_sakila_schema.sql` : création de la base `sakila`
- `02_sakila_data.sql` : données de test
- `03_users_schema.sql` : table `users` + données de connexion

Ils sont automatiquement exécutés au premier lancement du container.
