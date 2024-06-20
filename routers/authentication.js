import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";


const router = express.Router();

const connectionURI = process.env.MONGO_URI;

const client = new MongoClient(connectionURI,{
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

// Connect to MongoDB
client
  .connect()
  .then(() => {
    console.log("Connected to the database successfully.");

    const database = client.db("GameOfCode");
    const collection = database.collection("Users");
    console.log("connected to Users collection");




    // Parse JSON bodies for incoming requests
    router.use(express.json());

        // Handle POST requests for registration
        router.post('/signup', async (req, res) => {
            try {
                // Extract user data from the request body
                const userData = req.body;
                // Insert user data into the "users" collection
                const result = await collection.insertOne(userData);
                // Send a response indicating success and the data has been received
                res.json({ message: "Data stored in database, user registered successfully" });
            } catch (error) {
                // Handle errors and send a 500 Internal Server Error response
                res.status(500).json({ error: "Internal server error" });
            }
        });

    // Handle POST requests for login
    router.post("/login", async (req, res) => {
      try {
        const { UserName, Password } = req.body;

        if (!UserName || !Password) {
          return res
            .status(400)
            .json({ error: "username and password not good" });
        }

        const user = await collection.findOne({ UserName, Password });

        if (user) {
          req.session.userid = user._id;
          req.session.username = user.UserName;
          if (!("username" in req.session)) {
            console.log("login failed");
          } else {
            console.log("Login successful for user: ", user);
            console.log(req.session);
            res.json({ message: "Login successful" });
          }
          console.log(req.session);
        } else {
          console.error("invalid username or password");
          res.status(401).json({ error: "invalid username or password" });
        }
      } catch (error) {
        console.error("login error: ", error);
        res.status(500).json({ error: "internal server error" });
      }
    });

    // Handle GET requests for logout
    router.get("/logout", (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          res.status(500).send("could not logout");
        } else {
          res.send({ message: "logout successful" });
        }
      });
    });

 })
  .catch((err) => console.error("Error connecting to MongoDB: ", err));

export default router;
