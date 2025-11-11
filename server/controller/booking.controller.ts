import { Request, Response } from "express";
import { Guides } from "../models/guides.model";
import { Booking } from "../models/booking.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CheckoutSessionRequest = {
  selectedItems: {
    serviceId: string;
    name: string;
    image: string;
    price: number;
    duration: number;
    travelers: number;
  }[];
  bookingDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  guideId: string;
};

// Get bookings
export const getBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookings = await Booking.find({ user: req.id })
      .populate("user")
      .populate("guide")
      .select("+totalAmount");
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Create checkout session
export const createCheckOutSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    const guide = await Guides.findById(
      checkoutSessionRequest.guideId
    ).populate("services");
    if (!guide) {
      res.status(404).json({
        success: false,
        message: "Guide not found",
      });
      return;
    }
    const totalAmount = checkoutSessionRequest.selectedItems.reduce(
      (sum, item) => {
        return sum + item.price * item.duration * item.travelers;
      },
      0
    );
    const booking: any = new Booking({
      guide: guide._id,
      user: req.id,
      bookingDetails: checkoutSessionRequest.bookingDetails,
      selectedItems: checkoutSessionRequest.selectedItems,
      totalAmount: totalAmount,
      status: "pending",
    });

    const serviceItems = guide.services;
    const lineItems = createLineItems(checkoutSessionRequest, serviceItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA"],
      },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/booking/status`,
      cancel_url: `${process.env.FRONTEND_URL}/booking-summary`,
      metadata: {
        orderId: booking._id.toString(),
      },
    });

    if (!session.url) {
      res.status(400).json({
        success: false,
        message: "Error while creating session",
      });
      return;
    }

    await booking.save();

    res.status(200).json({ session });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const stripeWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  let event;

  try {
    const signature = req.headers["stripe-signature"];

    // Construct the payload string for verification
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

    // Generate test header string for event construction
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    // Construct the event using the payload string and header
    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    res.status(400).send(`Webhook error: ${error.message}`);
    return;
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;
      const booking = await Booking.findById(session.metadata?.orderId);

      if (!booking) {
        res.status(404).json({ message: "Booking not found" });
        return;
      }

      // Update the order with the amount and status
      if (session.amount_total) {
        booking.totalAmount = session.amount_total;
      }
      booking.status = "confirmed";

      await booking.save();
    } catch (error) {
      console.error("Error handling event:", error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }
  // Send a 200 response to acknowledge receipt of the event
  res.status(200).send();
};

export const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  serviceItems: any
): any[] => {
  const lineItems = checkoutSessionRequest.selectedItems.map((selectedItem) => {
    const serviceItem = serviceItems.find(
      (item: any) => item._id.toString() === selectedItem.serviceId
    );
    if (!serviceItem) throw new Error(`Service item id not found`);
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: serviceItem.name,
          images: [serviceItem.image],
          description: `Duration: ${selectedItem.duration} hours | Travelers: ${selectedItem.travelers}`,
        },
        // unit_amount: serviceItem.price * 100
        unit_amount:
          serviceItem.price *
          selectedItem.duration *
          selectedItem.travelers *
          100,
      },
      // quantity:selectedItem.quantity,
      quantity: 1,
    };
  });
  return lineItems;
};
