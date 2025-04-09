// firebase-messaging-sw.js
// ใช้ Firebase SDK เวอร์ชันที่เหมาะสมสำหรับ Service Worker
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAXqgO7tadgM6q6vD7ajdToC-aP6FticWs",
  authDomain: "ku-report.firebaseapp.com",
  projectId: "ku-report",
  storageBucket: "ku-report.firebasestorage.app",
  messagingSenderId: "1029958664659",
  appId: "1:1029958664659:web:e336f2312dd8e5574e2f26",
  measurementId: "G-BMG4SEVX62"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/firebase-logo.png',
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});