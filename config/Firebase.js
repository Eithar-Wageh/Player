// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrOSFK_WlUBi5rTaDjNikhe3-j8W-_mMU",
  authDomain: "player-e6134.firebaseapp.com",
  projectId: "player-e6134",
  storageBucket: "player-e6134.firebasestorage.app",
  messagingSenderId: "368479278295",
  appId: "1:368479278295:web:c0b49c68505376da104c92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;