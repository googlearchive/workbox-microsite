importScripts('https://unpkg.com/workbox-sw@0.0.1');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

// Content tk.
