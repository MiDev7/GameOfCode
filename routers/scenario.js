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
  client.connect().then(() => {
    console.log("Connected to the database successfully.");
    const database = client.db("GameOfCode");
    const scenario = database.collection("scenario");

    console.log("Connected to scenario successfully.");

    router.get("/GetScenario", async (req, res) => {
      const scenarios = await scenario.find({}).toArray();
      res.json(scenarios);
    });

    router.post("/AddScenario", async (req, res) => {
      const scenarioData = req.body;
      const result = await scenario.insertOne(scenarioData);

      res.json({
        message: "Data stored in database, scenario added successfully",
      });
    });

    router.get("/GetScenarioById", (req, res) => {
      const id = req.body.id;
      console.log(id);
      const scenarioData = scenario.findOne({ _id: id });
      res.json(scenarioData);
    });
  });
} catch (error) {
  console.log(error);
} finally {
  await client.close();
}

export default router;
