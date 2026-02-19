// Firebase config (same as login)
const firebaseConfig = {
  apiKey: "AIzaSyCWL5U3FKu0067dz4uVzz7yGm9PkqQxvkQ",
  authDomain: "anton-871fe.firebaseapp.com",
  projectId: "anton-871fe",
  storageBucket: "anton-871fe.firebasestorage.app",
  messagingSenderId: "211150176132",
  appId: "1:211150176132:web:28f935a54120d3909a67d1",
  measurementId: "G-ZENBQ72CC3"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const email = sessionStorage.getItem("userEmail");
const plusBtn = document.getElementById("plusBtn");
const popup = document.getElementById("popup");
const logoutMenu = document.getElementById("logoutMenu");
const adminSection = document.getElementById("adminSection");

// Fetch admins
fetch("/admins").then(res => res.json()).then(admins => {
  if (admins.includes(email)) {
    plusBtn.classList.add("admin");
    adminSection.classList.remove("hidden");
    plusBtn.onclick = () => popup.classList.remove("hidden");
  } else {
    plusBtn.onclick = () =>
      window.open("https://docs.google.com/forms/d/e/1FAIpQLScuqGI3RcaVAUJeTtj-XOEXz-HCjDmxxC9awWE7oo7ewpmanA/viewform?usp=publish-editor", "_blank");
  }
});

// Add new card
document.getElementById("addCardBtn").onclick = () => {
  const iframe = document.getElementById("iframeUrl").value;
  const image = document.getElementById("imageUrl").value;

  fetch("/add-card", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ iframe, image })
  }).then(() => location.reload());
};

// Add admin
document.getElementById("addAdminBtn").onclick = () => {
  const newEmail = document.getElementById("newAdminEmail").value;
  fetch("/add-admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: newEmail })
  });
};

// Load cards
fetch("/cards").then(res => res.json()).then(cards => {
  const container = document.getElementById("cardsContainer");
  cards.forEach(card => {
    const img = document.createElement("img");
    img.src = card.image;
    img.className = "card";
    img.onclick = () => {
      document.getElementById("fullIframe").src = card.iframe;
      document.getElementById("iframeViewer").classList.remove("hidden");
    };
    container.appendChild(img);
  });
});

// Close iframe popup
document.getElementById("closeIframe").onclick = () =>
  document.getElementById("iframeViewer").classList.add("hidden");

// Logout menu
document.getElementById("profileCircle").onclick = () =>
  logoutMenu.classList.toggle("hidden");

// Logout button
document.getElementById("logoutBtn").onclick = () => {
  auth.signOut();
  sessionStorage.clear();
  window.location = "/";
};
