const email = sessionStorage.getItem("userEmail");
const plusBtn = document.getElementById("plusBtn");
const popup = document.getElementById("popup");
const logoutMenu = document.getElementById("logoutMenu");
const adminSection = document.getElementById("adminSection");

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

document.getElementById("addCardBtn").onclick = () => {
  const iframe = document.getElementById("iframeUrl").value;
  const image = document.getElementById("imageUrl").value;

  fetch("/add-card", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ iframe, image })
  }).then(() => location.reload());
};

document.getElementById("addAdminBtn").onclick = () => {
  const email = document.getElementById("newAdminEmail").value;
  fetch("/add-admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
};

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

document.getElementById("closeIframe").onclick = () =>
  document.getElementById("iframeViewer").classList.add("hidden");

document.getElementById("profileCircle").onclick = () =>
  logoutMenu.classList.toggle("hidden");

document.getElementById("logoutBtn").onclick = () => {
  sessionStorage.clear();
  window.location = "/";
};
