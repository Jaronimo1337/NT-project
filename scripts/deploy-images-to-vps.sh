#!/usr/bin/env bash
set -euo pipefail

VPS="${VPS:-root@173.212.242.113}"
ARCHIVE="${ARCHIVE:-/tmp/nt-images.tar.gz}"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# VPS is linux/amd64; Mac Apple Silicon builds arm64 by default — must cross-build.
PLATFORM="${PLATFORM:-linux/amd64}"

if [[ "${SKIP_BUILD:-0}" != "1" ]]; then
  echo "==> Building images for $PLATFORM (Mac → VPS)..."
  docker buildx build --platform "$PLATFORM" -t nt-project-server:latest --load "$REPO_DIR/server"
  docker buildx build --platform "$PLATFORM" -t nt-project-client:latest --load "$REPO_DIR/client"
  echo "==> Saving to $ARCHIVE ..."
  docker save nt-project-server:latest nt-project-client:latest | gzip > "$ARCHIVE"
else
  echo "==> SKIP_BUILD=1 — using existing $ARCHIVE (must already be $PLATFORM)"
fi
test -f "$ARCHIVE" || { echo "Missing $ARCHIVE"; exit 1; }
echo "    $(ls -lh "$ARCHIVE" | awk '{print $5}')"

echo "==> Uploading to VPS (password once)..."
scp "$ARCHIVE" "$VPS:/tmp/nt-images.tar.gz"

echo "==> Loading and starting on VPS (password may prompt again)..."
ssh "$VPS" bash -s <<'REMOTE'
set -euo pipefail
cd ~/NT-project
git pull origin main 2>/dev/null || git pull origin main
gunzip -c /tmp/nt-images.tar.gz | docker load
docker compose -f docker-compose.yml -f docker-compose.prebuilt.yml up -d --no-build
docker compose ps
echo "--- server ---"
docker compose logs server --tail 15
REMOTE

echo "Done. Site: http://173.212.242.113:8080"
