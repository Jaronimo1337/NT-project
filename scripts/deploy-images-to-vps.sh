#!/usr/bin/env bash
# Deploy to Contabo VPS from a Mac (Apple Silicon OK).
# Do NOT run "docker compose build" on the VPS — npm crashes there every time.
set -euo pipefail

VPS="${VPS:-root@173.212.242.113}"
ARCHIVE="${ARCHIVE:-/tmp/nt-images.tar.gz}"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PLATFORM="${PLATFORM:-linux/amd64}"

echo "==> Building for $PLATFORM (this is the only place we run npm)..."
docker buildx build --platform "$PLATFORM" -t nt-project-server:latest --load "$REPO_DIR/server"
docker buildx build --platform "$PLATFORM" -t nt-project-client:latest --load "$REPO_DIR/client"

echo "==> Verifying images before upload..."
SERVER_ARCH=$(docker image inspect nt-project-server:latest --format '{{.Architecture}}')
CLIENT_ARCH=$(docker image inspect nt-project-client:latest --format '{{.Architecture}}')
if [[ "$SERVER_ARCH" != "amd64" || "$CLIENT_ARCH" != "amd64" ]]; then
  echo "ERROR: Images must be amd64 for the VPS (got server=$SERVER_ARCH client=$CLIENT_ARCH)"
  exit 1
fi
docker run --rm --platform "$PLATFORM" --entrypoint node nt-project-server:latest \
  -e "require('express'); require('./src/models'); console.log('server ok')"
docker run --rm --platform "$PLATFORM" --entrypoint sh nt-project-client:latest \
  -c "test -f /usr/share/nginx/html/index.html && echo client ok"

echo "==> Saving $ARCHIVE ..."
docker save nt-project-server:latest nt-project-client:latest | gzip > "$ARCHIVE"
ls -lh "$ARCHIVE"

echo "==> Uploading to VPS..."
scp "$ARCHIVE" "$VPS:/tmp/nt-images.tar.gz"

echo "==> Starting on VPS (no build, no npm)..."
ssh "$VPS" bash -s <<'REMOTE'
set -euo pipefail
cd ~/NT-project
git pull origin main
docker compose -f docker-compose.yml -f docker-compose.prebuilt.yml down || true
gunzip -c /tmp/nt-images.tar.gz | docker load
docker compose -f docker-compose.yml -f docker-compose.prebuilt.yml up -d --no-build
sleep 5
docker compose ps
echo "--- server (last 20 lines) ---"
docker compose logs server --tail 20
if docker compose ps --format '{{.Name}} {{.Status}}' | grep -q 'broker_server.*unhealthy'; then
  echo "ERROR: broker_server is unhealthy. Paste the log above when asking for help."
  exit 1
fi
REMOTE

echo ""
echo "Done → http://173.212.242.113:8080  (or https://eimonte.lt)"
