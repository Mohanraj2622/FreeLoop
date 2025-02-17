self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline-cache").then((cache) => {
      return cache.addAll(["./offline.html"]); // Ensure correct path
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match("./offline.html").then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
