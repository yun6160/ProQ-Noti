importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js'
);

// 워크박스가 정상적으로 로드되었는지 확인
if (workbox) {
  console.log('Workbox loaded successfully!');
} else {
  console.log('Failed to load Workbox!');
}

workbox.setConfig({ debug: false });

// 서비스 워커 설치 이벤트
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting(); // 새로 설치된 서비스 워커가 즉시 활성화되도록 강제
});

// 서비스 워커 활성화 이벤트
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim()); // 즉시 클라이언트를 제어
});

// Workbox를 사용하여 리소스 캐싱 및 기타 처리
workbox.precaching.precacheAndRoute([
  {
    url: '/_next/static/chunks/380-4d49679500aca3fe.js',
    revision: 'gDfdCvvNai9wFE6rq-_hJ'
  },
  {
    url: '/_next/static/chunks/app/page-58d6a07439da8365.js',
    revision: 'gDfdCvvNai9wFE6rq-_hJ'
  }
  // 여기에 더 많은 파일을 추가할 수 있습니다.
]);

// 기타 라우팅 및 캐싱 설정 (예: 이미지, 폰트 등)
workbox.routing.registerRoute(
  /\.(?:jpg|jpeg|png|gif|svg|ico|webp)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'static-image-assets',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 64,
        maxAgeSeconds: 86400
      })
    ]
  }),
  'GET'
);
