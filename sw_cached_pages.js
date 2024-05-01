const cacheName = 'apun ka cache';

const cacheAssets = [
    'index.html',
    'style.css',
    'main.js'
];

// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log("Service Worker: Caching Files");
                return cache.addAll(cacheAssets); // Added return statement
            })
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(cache => {
                    if (cache !== cacheName) {
                        console.log("Service Worker: Clearing old cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
