#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHROME_BIN="${CHROME_BIN:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="$ROOT_DIR/docs/screenshots"; PROFILE="$(mktemp -d)"; trap 'rm -rf "$PROFILE"' EXIT; mkdir -p "$OUT"
URL="file://$ROOT_DIR/index.html"
"$CHROME_BIN" --headless=new --hide-scrollbars --allow-file-access-from-files --user-data-dir="$PROFILE/desktop" --window-size=1440,1100 --screenshot="$OUT/storefront-desktop.png" "$URL"
"$CHROME_BIN" --headless=new --hide-scrollbars --allow-file-access-from-files --user-data-dir="$PROFILE/mobile" --window-size=430,930 --screenshot="$OUT/storefront-mobile.png" "$URL"
