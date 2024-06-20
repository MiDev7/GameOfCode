import { Router } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

const router = Router();

const database = null;

const password = "Taran2706!";
const username = "tb848";
const server = "cluster0.2ior5mc.mongodb.net";

const encodedeusername = encodeURIComponent(username);
const encodedpassword = encodeURIComponent(password);

const connectionURI = `mongodb+srv://${encodedeusername}:${encodedpassword}@${server}/?retryWrites=true&w=majority&routerName=Cluster0`;

const client = new MongoClient(connectionURI);

try {
  const database = client.db("GameOfCode");
  const scenario = database.collection("scenario");

  console.log("Connected to scenario successfully.");

  router.get("/scenario", async (req, res) => {
    const scenarios = await scenario.find({}).toArray();
    res.json(scenarios);
  });
} catch (error) {
  console.log(error);
} finally {
  await client.close();
}

export default router;
