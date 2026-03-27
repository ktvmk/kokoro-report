(() => {
  if (!window.firebase) {
    console.warn('Firebase SDK not loaded. Auth/DB features are disabled.');
    return;
  }

  const firebaseConfig = {
    apiKey: 'AIzaSyBQZxCrYaU6p0Pyc9VN0ZcC__ZZfgCpUbI',
    authDomain: 'kokoro-report.firebaseapp.com',
    projectId: 'kokoro-report',
    storageBucket: 'kokoro-report.firebasestorage.app',
    messagingSenderId: '5495572047',
    appId: '1:5495572047:web:85297dcd6dd5acf60ecc3a',
    measurementId: 'G-BD4VGD73HN'
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  window.firebaseServices = { app, auth, db, storage };
})();
