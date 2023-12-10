importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBRCXDAiJUi8cMvFS6pXJwa9nFOIfkwvos",
    authDomain: "circlechat-ce68f.firebaseapp.com",
    databaseURL: "https://circlechat-ce68f-default-rtdb.firebaseio.com",
    projectId: "circlechat-ce68f",
    storageBucket: "circlechat-ce68f.appspot.com",
    messagingSenderId: "760966902174",
    appId: "1:760966902174:web:6a2e97b7251daf12e8668f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'You have new message';
    const notificationOptions = {
        body: payload.data.message,
        icon: payload.data.icon
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});



