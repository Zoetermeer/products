# Product App — Minimal Setup

This repository contains a Java/Spring Boot backend and a Vite/TypeScript frontend.
The steps below are the minimal instructions to run both locally and point the
backend at your own PostgreSQL instance.

## Prerequisites

- Java 17+
- Maven (the Maven Wrapper is included, use `./mvnw`)
- Node.js 18+ (20+ recommended) and npm
- PostgreSQL 14+ (tested with 16.x)

## 1) Database: create a database and user

You can use an existing Postgres instance, or run one locally. Example using psql:

```sh
# Start psql (adjust host/port as needed)
psql -h localhost -p 5432 -U postgres

-- Inside psql, create a database and user (adjust names/passwords)
CREATE DATABASE products;
CREATE USER products_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE products TO products_user;
```

## 2) Backend: configure it to use your Postgres

You can either edit `backend/src/main/resources/application.properties` directly,
or (recommended) set environment variables when running the app.

Environment variables (Linux/macOS shells):

```sh
export SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/products"
export SPRING_DATASOURCE_USERNAME="products_user"
export SPRING_DATASOURCE_PASSWORD="your_password"
```

If you prefer file-based config, update these keys in
`backend/src/main/resources/application.properties`:

- `spring.datasource.url`
- `spring.datasource.username`
- `spring.datasource.password`

## 3) Backend: run the API server

From the repo root:

```sh
cd backend
./mvnw spring-boot:run
```

On startup you should see logs indicating Flyway validated and applied migrations,
then Tomcat starts on port 8080.

Quick smoke test:

```sh
curl http://localhost:8080/api/products
# -> [] on a fresh DB

curl -X POST http://localhost:8080/api/products \
  -H 'Content-Type: application/json' \
  -d '{"name":"Widget"}'
```

## 4) Frontend: run the web app

From the repo root:

```sh
cd frontend
npm install
npm run dev
```

By default, Vite serves on http://localhost:5173.

### Pointing the frontend at the backend

The frontend is configured (with Vite) to proxy API requests to http://localhost:8080.
If your backend is running elsewhere, update `vite.config.ts` accordingly.

## Project layout

- `backend/` — Spring Boot REST API (port 8080). Migrations in `src/main/resources/db/migration`.
- `frontend/` — Vite/TypeScript web app (dev server default port 5173).

## Clean up / rebuild

```sh
cd backend
./mvnw -q -DskipTests clean package
```

If you change DB creds, restart the backend so it reconnects with the new settings.

