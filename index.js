import express from "express";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { MongoClient, ServerApiVersion } from "mongodb";



const app = express();

const PORT = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

const password = "Taran2706!";
const username = "tb848";
const server = "cluster0.2ior5mc.mongodb.net";

const encodedeusername = encodeURIComponent(username);
const encodedpassword = encodeURIComponent(password);

const connectionURI = `mongodb+srv://${encodedeusername}:${encodedpassword}@${server}/?retryWrites=true&w=majority&appName=Cluster0`;


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
