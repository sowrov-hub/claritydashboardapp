# Clarity Dashboard PWA

This folder is ready to publish as a Progressive Web App on GitHub Pages. Upload these files together, retaining their exact names:

- `index.html`
- `manifest.webmanifest`
- `service-worker.js`
- `ChatGPT Image May 19, 2026, 03_02_46 PM.png`

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload the four files above to the repository root and commit them.
3. In **Settings → Pages**, set **Build and deployment** to **Deploy from a branch**, then select `main` and the `/ (root)` folder.
4. Open the GitHub Pages URL. The dashboard loads from `index.html` automatically.
5. Once it loads, use the browser's **Install app** option. After the first successful load, the dashboard shell is available offline.

GitHub Pages provides HTTPS, which is required for service workers and PWA installation. Data remains in each device's browser storage, so it is not shared automatically between devices.

## Password protection

The dashboard uses one shared access password. This is a basic browser-only gate, not a multi-user or server-side login system. A public GitHub Pages site cannot securely restrict paid access because its client-side files can be inspected.
