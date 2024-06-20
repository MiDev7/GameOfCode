import { Router, response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

// Google Api
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function getDailyScenario(language) {
  while (true) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a creative murder mystery scenario for a question on the principles of coding and provide 4 choices of answer like (A,B,C,D)and give the right answer , in this programming language ${language}, provide with explanation of the concept used for the answer, provide the difficulty of it,parse it in json format`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let parsedJSON = null;
    try {
      parsedJSON = JSON.parse(
        response
          .text()
          .replace("json", "")
          .replaceAll("```", "")
          .replaceAll("*", "")
      );
    } catch {
      continue;
    } finally {
      return parsedJSON;
    }
  }
}

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

    router.get("/GetScenarioByLanguage", async (req, res) => {
      const response = await getDailyScenario("python");
      res.json(response);
    });
  });
} catch (error) {
  console.log(error);
} finally {
  await client.close();
}

export default router;
