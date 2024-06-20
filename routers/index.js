import { Router } from "express";

import Scenario from "../models/scenario";

const combinedRouter = Router();

combinedRouter.use(Scenario);
