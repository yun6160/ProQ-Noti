// src/lib/firebase.ts

'use client';

import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getMessaging, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Firebase 앱 초기화는 서버/클라이언트 양쪽에서 안전
const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

let analytics: Analytics | null = null;
let messaging: Messaging | null = null;

// 브라우저 환경에서만 각 서비스를 초기화하는 함수들을 export
export const getFirebaseAnalytics = (): Analytics | null => {
  if (typeof window !== 'undefined') {
    if (!analytics) {
      analytics = getAnalytics(app);
    }
    return analytics;
  }
  return null;
};

export const getFirebaseMessaging = (): Messaging | null => {
  if (typeof window !== 'undefined') {
    if (!messaging) {
      messaging = getMessaging(app);
    }
    return messaging;
  }
  return null;
};

export { app };
