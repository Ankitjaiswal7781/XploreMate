import express, { Request, Response } from "express";
import { askRag } from "../controller/rag.controller";

const router = express.Router();

router.route("/query").post(askRag);

export default router;
