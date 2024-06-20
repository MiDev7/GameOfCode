import { Router } from "express";
import Scenario from "./scenario.js";
import Auth from "./authentication.js";

const combinedRouter = Router();

combinedRouter.use(Scenario);
combinedRouter.use(Auth);

export default combinedRouter;
