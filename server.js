const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

const ADMIN_FILE = "./data/admins.json";
const DATA_FILE = "./data/data.json";

if (!fs.existsSync("./data")) fs.mkdirSync("./data");
if (!fs.existsSync(ADMIN_FILE))
  fs.writeFileSync(ADMIN_FILE, JSON.stringify(["antonkrupinski0@gmail.com"]));
if (!fs.existsSync(DATA_FILE))
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));

app.get("/admins", (req, res) => {
  res.json(JSON.parse(fs.readFileSync(ADMIN_FILE)));
});

app.post("/add-admin", (req, res) => {
  const { email } = req.body;
  const admins = JSON.parse(fs.readFileSync(ADMIN_FILE));
  if (!admins.includes(email)) admins.push(email);
  fs.writeFileSync(ADMIN_FILE, JSON.stringify(admins));
  res.json({ success: true });
});

app.get("/cards", (req, res) => {
  res.json(JSON.parse(fs.readFileSync(DATA_FILE)));
});

app.post("/add-card", (req, res) => {
  const { iframe, image } = req.body;
  const cards = JSON.parse(fs.readFileSync(DATA_FILE));
  cards.push({ iframe, image });
  fs.writeFileSync(DATA_FILE, JSON.stringify(cards));
  res.json({ success: true });
});

app.listen(3000, () => console.log("🔥 Server running on http://localhost:3000"));
