importScripts(
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js'
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

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// 4. 최종 Push 이벤트 핸들러
messaging.onBackgroundMessage(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// PWA의 설치 이벤트를 처리 (필수)
self.addEventListener('install', (event) => {
  console.log('서비스 워커: 설치 완료!');
  self.skipWaiting(); // 즉시 활성화
});
