import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";
import { addServices, editServices } from "../controller/services.controller";

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("image"), addServices);
router.route("/:id").put(isAuthenticated, upload.single("image"), editServices);

export default router;
