const cacheName = 'v1';


// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

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

self.addEventListener('fetch', e => {
    console.log('service worker : fetcheing');
    e.respondWith(
        fetch(e.request)
        .then( res =>{
            const resClone = res.clone()
//add response to cache
            caches.open(cacheName)
            .then(cache =>{
                cache.put(e.request,resClone);
            })
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );


})