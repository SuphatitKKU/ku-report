// firebase-messaging-sw.js
// ใช้ Firebase SDK เวอร์ชัน 8.x สำหรับ Service Worker
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// บันทึกว่า SW ทำงาน
console.log("Firebase Service Worker ทำงานแล้ว!");

// Firebase Configuration
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

console.log("Firebase Messaging ทำงานใน Service Worker");

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log("ได้รับข้อความพื้นหลัง:", payload);
  
  const notificationTitle = payload.notification?.title || "มีการแจ้งเตือนใหม่";
  const notificationOptions = {
    body: payload.notification?.body || "มีข้อความใหม่สำหรับคุณ",
    icon: payload.notification?.icon || '/firebase-logo.png',
    badge: '/badge-icon.png',
    data: payload.data
  };
  
  if (payload.notification?.click_action) {
    notificationOptions.data = {
      ...notificationOptions.data,
      url: payload.notification.click_action
    };
  }
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  // ถ้ามี URL กำหนดไว้ใน notification data
  if (event.notification.data && event.notification.data.url) {
    const urlToOpen = new URL(event.notification.data.url, self.location.origin).href;
    
    const promiseChain = clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then((windowClients) => {
      // ตรวจสอบว่ามีหน้าต่างที่เปิดอยู่แล้วหรือไม่
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      
      // ถ้าไม่มีหน้าต่างที่เปิดอยู่ ให้เปิดหน้าต่างใหม่
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    });
    
    event.waitUntil(promiseChain);
  } else {
    // ถ้าไม่มี URL ระบุให้เปิดหน้าเว็บหลัก
    event.waitUntil(clients.openWindow('/'));
  }
});
