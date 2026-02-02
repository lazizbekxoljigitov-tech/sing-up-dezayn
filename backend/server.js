const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // AlwaysData portni beradi

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// ===== DATA FILE =====
const DATA_FILE = path.join(__dirname, "data.json");

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// ===== USER MESSAGE API =====
app.post("/api/message", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Ma'lumotlar to‘liq emas" });
  }

  const messages = JSON.parse(fs.readFileSync(DATA_FILE));
  messages.push({
    id: Date.now(),
    name,
    email,
    message,
    time: new Date().toLocaleString(),
  });

  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
  res.json({ success: true });
});

// ===== ADMIN API =====
app.get("/api/admin/messages", (req, res) => {
  const messages = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(messages);
});

// ===== ADMIN PANEL =====
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./admin/index.html"));
});

// 🔥 MUHIM: slash bilan ham ishlashi uchun
app.get("/admin/", (req, res) => {
  res.sendFile(path.join(__dirname, "./admin/index.html"));
});

app.post("/api/message", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "Ma'lumotlar to‘liq emas" });

  const messages = JSON.parse(fs.readFileSync(DATA_FILE));
  messages.push({
    id: Date.now(),
    name,
    email,
    message,
    time: new Date().toLocaleString(),
  });

  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
  res.json({ success: true });
});

app.use(express.static(path.join(__dirname, "../frontend")));

// ===== ADMIN PANEL =====
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/admin.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server ishlayapti: http://localhost:${PORT}`);
});
