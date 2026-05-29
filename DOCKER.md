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

---

## VPS deploy (small server)

Your `.env` must **not** set `NODE_ENV=production` during image build (it makes npm skip Vite). Runtime can use `production`.

If `npm install` fails with `Exit handler never called` or `vite: not found`, the VPS is usually **out of RAM** during the client build.

### Option A — build client on your computer (recommended)

On your Mac/PC:

```bash
cd client
npm ci
npm run build
cd ..
git add client/dist   # only if you commit dist, OR rsync dist to the server
```

Copy `client/dist` to the server, then on the VPS:

```bash
cd ~/NT-project
docker compose -f docker-compose.yml -f docker-compose.static-client.yml build client --no-cache
docker compose build server --no-cache
docker compose up -d
```

### Option B — build on VPS (needs ~2GB RAM or swap)

```bash
# Add 2GB swap once if the VPS has <2GB RAM
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile

git pull
docker compose build --no-cache
docker compose up -d
```

### If the server container exits

```bash
docker compose logs server --tail 80
```

Common fixes: check `DB_PASSWORD` in `.env` matches Postgres, and `JWT_SECRET` is set.
