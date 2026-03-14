import express from "express";
import { resarchController } from "../controllers/resarchControllers.ts";
const router = express.Router();

router.post("/research", resarchController);

export default router;