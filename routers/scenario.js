import { Router } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionURI = process.env.MONGO_URI;

const router = Router();

const client = new MongoClient(connectionURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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
