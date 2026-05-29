# Run locally with Docker

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose)

```bash
cp .env.example .env   # first time only
```

---

## Development (hot reload) — use this while coding

Changes to React or API code update **automatically**. No rebuild, no restarting the terminal.

```bash
# First time (or after adding npm packages)
npm run dev:build

# Every day after that — just start and leave it running
npm run dev
```

Open **http://localhost:5174** (not 8080; port 5174 avoids clashes with other Vite apps on 5173).

| What | How it updates |
|------|----------------|
| React / CSS | Instant (Vite HMR) |
| Server `src/` | Auto-restart (nodemon) |

Stop with `Ctrl+C`, or in another terminal: `npm run down`

**Port already in use?**

```bash
npm run down
npm run dev
```

Or: `npm run dev:clean`

Dev uses host port **5174** (not 5173) so it won’t fight with other Vite projects.

---

## Production preview (built site)

Tests the real nginx build — slower, rebuild when you change code.

```bash
npm run prod
```

Open **http://localhost:8080**

---

## URLs

| Mode | Site | Admin | API |
|------|------|-------|-----|
| Dev | http://localhost:5174 | /admin | http://localhost:3001 |
| Prod | http://localhost:8080 | /admin | proxied via nginx |

Default admin (`.env`): `admin@example.com` / `admin123`

## Other commands

```bash
npm run down              # stop all containers
docker compose logs -f    # follow logs
docker compose down -v    # stop + wipe database
```

## Switching dev ↔ prod

```bash
npm run down
npm run dev        # or npm run prod
```

Do not run both at once (client uses 5174 vs 8080).
