import { auth, provider, mostrarLoading, esconderLoading } from './firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

// Elementos
const username = document.getElementById("usuario");
const senhaEl = document.getElementById("senha");
const btnRegistrar = document.getElementById("btnRegistrar");
const btnLogin = document.getElementById("btnLogin");
const btnFecharLogin = document.getElementById("btnFecharLogin");
const loginCardContainer = document.getElementById("loginCardContainer");
const btnMostrarLogin = document.getElementById("btnMostrarLogin");
const btnLogout = document.getElementById("btnLogout");
const userInfo = document.getElementById("userInfo");

// Mostrar e ocultar card
btnMostrarLogin.addEventListener("click", () => {
    loginCardContainer.style.display = "flex";
    loginCardContainer.classList.remove("d-none");
});

btnFecharLogin.addEventListener("click", () => {
    loginCardContainer.classList.add("d-none");
});

function formatarEmailFake(usuario) {
    return `${usuario.toLowerCase()}@emailfalso.fal`;
}

// Registro
btnRegistrar.addEventListener("click", async () => {

    if (username.value.includes("@")) {
        alert("Não use e-mail. Digite apenas um nome de usuário.");
        return;
    }

    mostrarLoading();
    try {
        await createUserWithEmailAndPassword(auth, formatarEmailFake(username.value), senhaEl.value);
        loginCardContainer.classList.add("d-none");
    } catch (e) {
        if (e.code === "auth/email-already-in-use") {
            alert(`O nome de usuário "${username.value}" já está em uso. Escolha outro.`);
        } else if (e.code === "auth/weak-password") {
            alert("A senha deve ter pelo menos 6 caracteres.");
        } else {
            alert("Erro ao registrar: " + e.message);
        }
    } finally {
        esconderLoading();
    }
});

// Login
btnLogin.addEventListener("click", async () => {

    if (username.value.includes("@")) {
        alert("Não use e-mail. Digite apenas um nome de usuário.");
        return;
    }

    mostrarLoading();
    try {
        await signInWithEmailAndPassword(auth, formatarEmailFake(username.value), senhaEl.value);
        loginCardContainer.classList.add("d-none");
    } catch (e) {
        switch (e.code) {
        case "auth/user-not-found":
            alert(`O usuário "${username.value}" não foi encontrado. Você precisa se registrar primeiro.`);
            break;
        case "auth/wrong-password":
        case "auth/invalid-email":
        case "auth/invalid-credential":
            alert("Usário ou senha incorretos. Verifique e tente novamente.");
            break;
        case "auth/too-many-requests":
            alert("Muitas tentativas de login falharam. Tente novamente mais tarde.");
            break;
        default:
            alert("Erro ao fazer login: " + e.message);
            break;
        }
    } finally {
        esconderLoading();
    }
});

document.getElementById("btnLogout").addEventListener("click", async () => {
    mostrarLoading();
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Erro ao deslogar:", e);
    } finally {
        esconderLoading();
    }
});

// Detecta mudanças de login
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuário logado:", user.email);

        loginCardContainer.classList.add("d-none");
        btnMostrarLogin.classList.add("d-none");
        btnLogout.classList.remove("d-none");
        userInfo.classList.remove("d-none");
        userInfo.textContent = user.email.split("@")[0];
        userInfo.style.color = "white";
        userInfo.style.cursor = "pointer";
        
    } else {
        console.log("Usuário deslogado.");

        btnMostrarLogin.classList.remove("d-none");
        btnLogout.classList.add("d-none");
        userInfo.classList.add("d-none");
        userInfo.textContent = "";
    }
});

const btnLoginGoogle = document.getElementById("btnLoginGoogle");

btnLoginGoogle.addEventListener("click", async () => {
    mostrarLoading();
    try {
        await signInWithPopup(auth, provider);
        loginCardContainer.classList.add("d-none");
    } catch (e) {
        alert("Erro ao fazer login com o Google: " + e.message);
    } finally {
        esconderLoading();
    }
});
