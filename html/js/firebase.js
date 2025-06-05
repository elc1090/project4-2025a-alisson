import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
import { getAuth, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBgNQZSkHXx5Pr3nmitgVDIsIeo4vC70Jw",
    authDomain: "webdev-t4.firebaseapp.com",
    projectId: "webdev-t4",
    storageBucket: "webdev-t4.firebasestorage.app",
    messagingSenderId: "618693411542",
    appId: "1:618693411542:web:b3793031350984a92bff77"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();

function mostrarLoading() {
    document.getElementById("loadingOverlay").classList.remove("d-none");
}

function esconderLoading() {
    document.getElementById("loadingOverlay").classList.add("d-none");
}

export { db, auth, provider, mostrarLoading, esconderLoading};
