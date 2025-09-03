importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyA_E5OoRqxBvnhJOr8SaUEl5Cq_RRZdxI8',
  authDomain: 'proq-noti.firebaseapp.com',
  projectId: 'proq-noti',
  storageBucket: 'proq-noti.firebasestorage.app',
  messagingSenderId: '286950705449',
  appId: '1:286950705449:web:25f99cd4c33fa248a8cf38',
  measurementId: 'G-JT3H0L9YT1'
};

// Firebase 앱 초기화
firebase.initializeApp(firebaseConfig);

// Firebase Messaging 객체 가져오기
const messaging = firebase.messaging();

// 서비스 워커 'install' 이벤트
// 새 서비스 워커가 설치될 때 바로 활성화되도록 강제 (선택 사항이지만 유용)
self.addEventListener('install', function (event) {
  console.log('[firebase-messaging-sw.js] Service Worker installing...');
  self.skipWaiting();
});

// 서비스 워커 'activate' 이벤트
// 서비스 워커가 활성화될 때 (새로운 버전이 로드되거나 처음 로드될 때)
self.addEventListener('activate', function (event) {
  console.log('[firebase-messaging-sw.js] Service Worker activating...');
  // 클라이언트가 새 서비스 워커로 제어되도록 강제 (선택 사항이지만 유용)
  event.waitUntil(clients.claim());
});

// FCM 백그라운드 메시지 수신 핸들러
// 앱이 포그라운드에 있지 않을 때 (브라우저가 닫히거나 다른 탭에 있을 때) 호출됨
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message: ',
    payload
  );

  const messageData = payload.data || {}; // data payload가 비어있을 경우를 대비

  // 푸시 알림으로 표시할 데이터 추출
  const notificationTitle = messageData.title || '새 알림';
  const notificationOptions = {
    body: messageData.body || '내용 없음',
    icon: messageData.icon || '/icon-192x192.png',
    badge: messageData.badge || '/android-192x192.png',
    image: messageData.image || undefined,
    vibrate: [300],
    data: messageData // data payload 전체를 notificationOptions.data에 넣어줌 (클릭 핸들러에서 사용)
  };
  // 푸시 알림 표시

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// 푸시 알림 클릭 이벤트 핸들러 (사용자가 알림을 클릭했을 때)
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received.', event);

  event.notification.close(); // 클릭된 알림 닫기

  // 알림 클릭 시 이동할 URL 정의
  // FCM 메시지 페이로드의 'fcm_options.link'나 'data.click_action'을 사용할 수 있습니다.
  const clickAction =
    event.notification.data?.click_action ||
    event.notification.fcmOptions?.link ||
    '/userpage'; // 기본 경로로 폴백

  // 해당 URL로 브라우저 탭 열기 또는 기존 탭 활성화
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // 이미 열려 있는 탭 중 해당 URL이 있는지 확인
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === clickAction && 'focus' in client) {
          return client.focus(); // 기존 탭이 있다면 활성화
        }
      }
      // 없으면 새 탭 열기
      if (clients.openWindow) {
        return clients.openWindow(clickAction);
      }
      return null; // 새 탭 열기 지원 안 되는 경우
    })
  );
});
