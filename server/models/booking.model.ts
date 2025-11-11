import mongoose, { Document } from "mongoose";

type BookingDetails = {
  email: string;
  name: string;
  address: string;
  city: string;
};

type SelectedItems = {
  serviceId: string;
  name: string;
  image: string;
  price: number;
  duration: number;
  travelers: number;
};

export interface IBooking extends Document {
  user: mongoose.Schema.Types.ObjectId;
  guide: mongoose.Schema.Types.ObjectId;
  bookingDetails: BookingDetails;
  selectedItems: SelectedItems;
  totalAmount: number;
  status: "pending" | "confirmed" | "preparing" | "inprogress" | "completed";
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guides",
      required: true,
    },
    bookingDetails: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    selectedItems: [
      {
        serviceId: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        duration: { type: Number, required: true },
        travelers: { type: Number, required: true },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "inprogress", "completed"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
