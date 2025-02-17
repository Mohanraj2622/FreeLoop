self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline-cache").then((cache) => {
      return cache.addAll(["./offline.html"]).catch((err) => console.error("Caching failed", err));
    })
  );
  self.skipWaiting(); // Activate immediately
});

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match("./offline.html").then((response) => {
        return response || new Response("Offline Page Not Available", { status: 503, statusText: "Service Unavailable" });
      })
    );
  }
});
