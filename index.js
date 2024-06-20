import express from "express";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/pages/login.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/static/pages/signup.html");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
