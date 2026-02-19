// Firebase config (same as login)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_PROJECT.firebaseapp.com",
  projectId: "YOUR_FIREBASE_PROJECT",
  storageBucket: "YOUR_FIREBASE_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
