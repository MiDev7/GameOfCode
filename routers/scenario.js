import { Router } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

const router = Router();

const client = new MongoClient(uri);
const database = null;

try {
  const database = client.db("GameOfCode");
  const scenario = database.collection("scenario");

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
