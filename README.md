# Shroudlands Starter (PWA)

This folder is a ready-to-host starter for your iOS-friendly web game.
It already works offline (service worker) and installs as a Home Screen app (manifest).

## Files
- `index.html` — entry point with a canvas demo + PWA hooks
- `app.js` — placeholder for your future game logic or WASM glue code
- `manifest.webmanifest` — PWA metadata and icons
- `sw.js` — service worker for offline caching
- `assets/icons/icon-192.png`, `icon-512.png` — app icons

## Run locally
You can open `index.html` directly, but on iOS you should host via HTTPS (GitHub Pages) for service workers to work.

## Publish with GitHub Pages (no installs)
1. Create a new public repo on GitHub.
2. Upload all files in this folder to the root of that repo.
3. Go to **Settings → Pages**. Under **Build and deployment**, set:
   - Source: **Deploy from a branch**
   - Branch: **main** (root)
4. Wait 1–2 minutes. Your site will be live at:
   - `https://<your-username>.github.io/<your-repo>/`
5. Open that URL in Safari on your iPhone → Share → **Add to Home Screen**.

## Update the app
- Bump the cache version in `sw.js` (e.g., `shroudlands-v1.0.1`), commit, and wait for Pages to redeploy.
- Existing users will get the update on next load.

## Next steps (when you add a real game)
- Add your actual JS/WASM loader to `app.js` and reference built assets.
- For Unity/Godot exports, place the generated `.wasm`, `.data`, `.js` files alongside `index.html` and add them to `ASSETS` in `sw.js`.
- Keep texture memory and heap budgets modest for iOS stability.
