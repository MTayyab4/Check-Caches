const cacheName = 'apun ka cache';

const cacheAssets = [
    'index.html',
    'style.css',
    'main.js'
];


// Call Install, Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log("Service Worker: Caching Files");
                cache.addAll(cacheAssets)
            })
        // Add all core files to the cache during
        // the install event
    )
});
// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    caches.keys().then(keyList => {
        return Promise.all(
            cacheName.map(cache => {
                if (cache !== cacheName) {
                    console.log("service worker : clearing cache");
                    return caches.delete(cache);
                }
            })
        )
    })
});