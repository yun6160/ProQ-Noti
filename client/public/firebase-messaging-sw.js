importScripts(
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyA_E5OoRqxBvnhJOr8SaUEl5Cq_RRZdxI8',
  authDomain: 'proq-noti.firebaseapp.com',
  projectId: 'proq-noti',
  storageBucket: 'proq-noti.firebasestorage.app',
  messagingSenderId: '286950705449',
  appId: '1:286950705449:web:25f99cd4c33fa248a8cf38',
  measurementId: 'G-JT3H0L9YT1'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
