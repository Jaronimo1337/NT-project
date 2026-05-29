# Deploy on VPS (only workflow)

On your Mac: push to GitHub.

On the server:

```bash
cd ~/NT-project
git pull origin main
docker compose up -d --build
docker compose ps
```

**Do not run** `docker compose down -v` (that deletes the database).

`.env` on the VPS should include `VITE_API_URL=` (empty).

First build after dockerfile changes can take several minutes (Yarn install). Later builds are faster (Docker cache).

## If build still fails

Paste this output:

```bash
docker compose build server 2>&1 | tail -40
docker version
free -h
```
