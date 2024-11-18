importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyADYEJqVHTqLSqWidFlE1_HUsKO3zV5MsQ",
    authDomain: "react-pwa-14512.firebaseapp.com",
    projectId: "react-pwa-14512",
    storageBucket: "react-pwa-14512.firebasestorage.app",
    messagingSenderId: "790290386851",
    appId: "1:790290386851:web:822fe36a17ecdc99111416"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/images/logos.png',
        vibrate: [200, 100, 200],
        requireInteraction: true
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});