// Minimal service worker – prevents 404 for /sw.js (e.g. from extensions or cached registration).
// Replace with a real service worker if you add PWA/offline support.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
