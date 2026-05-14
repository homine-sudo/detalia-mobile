// DETALIA Mobile Service Worker
// HTML (navigate) は常にネットワーク優先で取得し、
// オフライン時のフォールバックのみキャッシュを使用する。
// これにより GitHub Pages 更新が次回リロードで即反映される。

const CACHE_NAME = 'detalia-v1';
const FALLBACK_PAGES = ['./index.html', './manifest.json', './logo.png'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FALLBACK_PAGES).catch(()=>{}))
  );
});

self.addEventListener('activate', (e) => {
  // 古いキャッシュを削除
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // 同一オリジンのみ介入（Dropbox APIや外部リソースには触らない）
  if (url.origin !== location.origin) return;

  // HTML（ナビゲーション）リクエスト → ネットワーク優先、失敗時のみキャッシュ
  if (e.request.mode === 'navigate' ||
      (e.request.method === 'GET' && e.request.headers.get('accept')?.includes('text/html'))) {
    e.respondWith(
      fetch(e.request, { cache: 'reload' })
        .then((res) => {
          // 成功したらキャッシュも更新
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(e.request, copy)).catch(()=>{});
          return res;
        })
        .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // それ以外（manifest, logo等） → キャッシュ優先、なければネット
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).then((res) => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(e.request, copy)).catch(()=>{});
      }
      return res;
    }))
  );
});

// メインアプリから「強制更新」されたとき、即時更新応答
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
