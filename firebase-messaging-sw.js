// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js");

// 🔧 Config เหมือนใน index.html
firebase.initializeApp({
  apiKey: "AIzaSyAXqgO7tadgM6q6vD7ajdToC-aP6FticWs",
  authDomain: "ku-report.firebaseapp.com",
  projectId: "ku-report",
  storageBucket: "ku-report.firebasestorage.app",
  messagingSenderId: "1029958664659",
  appId: "1:1029958664659:web:e336f2312dd8e5574e2f26"
});

const messaging = firebase.messaging();

// ✅ แจ้งเตือนตอนเว็บปิด
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Background message received:', payload);
  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body: body,
    data: {
      url: payload.notification.click_action || "/"
    }
  });
});

// 🖱 เปิด URL เมื่อคลิก
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
