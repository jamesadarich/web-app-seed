// Set this to true for production
var doCache = true;

// Name our cache
const CACHE_NAME = "cache-v1";

console.log("setting up cache", CACHE_NAME);

// Delete old caches that are not our current one!
self.addEventListener("activate", (event: any) => {
  console.log("activate service worker");

  async function createServiceWorkerActivater() {
    const keyList = await caches.keys() as Array<string>;
    console.log("keys", keyList);
    keyList.map(key => {
      if (key !== CACHE_NAME) {
        console.log("Deleting cache: " + key);
        return caches.delete(key);
      }
    });
  }

  event.waitUntil(createServiceWorkerActivater());
});

// The first time the user starts up the PWA, "install" is triggered.
self.addEventListener("install", (event: any) => {
  console.log("install service worker");
  
  async function createServiceWorkerInstaller() {
    console.log("add to cache");
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([ "/", "/*" ]);
    console.log("cached", cache);
  }
  if (doCache) {
    event.waitUntil(createServiceWorkerInstaller());
  }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener("fetch", (event: any) => {
  console.log("fetch service worker");

  async function createServiceWorkerFetcher() {  
    console.log("fetching", event);  
    const response = caches.match(event.request);
    if (response) {                
      console.log("found in cache", event.request);
    }
    return response || fetch(event.request);
  }

  if (doCache) {
    console.log("requesting from cache", event.request);
    event.respondWith(createServiceWorkerFetcher());
  }
});
