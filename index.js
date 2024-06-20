import express from "express";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { MongoClient, ServerApiVersion } from "mongodb";
import combinedRouter from "./routers/index.js";
import session from "express-session";


const app = express();

const PORT = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("static"));


app.use(session({
  secret: 'gameofcode',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/pages/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/static/pages/login.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/static/pages/signup.html");
});

app.use(combinedRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
