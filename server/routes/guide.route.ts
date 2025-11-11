import express from "express";
import {
  createGuide,
  getGuide,
  getGuideBooking,
  getSingleGuide,
  searchGuide,
  updateBookingStatus,
  updateGuide,
} from "../controller/guide.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, upload.single("imageFile"), createGuide);
router.route("/").get(isAuthenticated, getGuide);
router.route("/").put(isAuthenticated, upload.single("imageFile"), updateGuide);
router.route("/booking").get(isAuthenticated, getGuideBooking);
router
  .route("/booking/:bookingId/status")
  .put(isAuthenticated, updateBookingStatus);
router.route("/search/:searchText").get(isAuthenticated, searchGuide);
router.route("/:id").get(isAuthenticated, getSingleGuide);

export default router;
