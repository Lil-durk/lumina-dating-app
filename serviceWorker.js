const cacheLumina = "cache-lumina";
const assets = [
  "./",
  "./index.html",
  "./homepage.html",
  "./missions.html",
  "./profile.html",
  "./css/style.css",
  "./js/homepage.js",
  "./js/index.js",
  "./images/coffee1.jpg",
  "./images/coffee2.jpg",
  "./images/coffee3.jpg",
  "./images/coffee4.jpg",
  "./images/coffee5.jpg",
  "./images/coffee6.jpg",
  "./images/coffee7.jpg",
  "./images/coffee8.jpg",
  "./images/coffee9.jpg",
  "./images/coffee10.png",
  "./images/camera.png",
  "./images/heart.png",
  "./images/homeIcon.png",
  "./images/logo.png",

];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(cacheLumina).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })

  