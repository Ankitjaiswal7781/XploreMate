import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createCheckOutSession,
  getBookings,
  stripeWebhook,
} from "../controller/booking.controller";

const router = express.Router();

router.route("/").get(isAuthenticated, getBookings);
router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckOutSession);
router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), stripeWebhook);

export default router;
