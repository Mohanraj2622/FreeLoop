self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline-cache").then((cache) => {
      return cache.addAll(["./offline.html"]);
    })
  );
  self.skipWaiting(); // Ensures new SW takes control immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim()); // Forces SW to control open pages
});

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || caches.match("./offline.html"); // Ensures offline.html is returned
      })
    );
  }
});
