import mongoose, { Document } from "mongoose";

export interface IGuides {
  user: mongoose.Schema.Types.ObjectId;
  guideName: string;
  city: string;
  country: string;
  tourDuration: number;
  servicesTypes: string[];
  imageUrl: string;
  services: mongoose.Schema.Types.ObjectId[];
}

export interface IGuidesDocument extends IGuides, Document {
  createdAt: Date;
  updatedAt: Date;
}

const guidesSchema = new mongoose.Schema<IGuidesDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guideName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    tourDuration: {
      type: Number,
      required: true,
    },
    servicesTypes: [{ type: String, required: true }],
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Services" }],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Guides = mongoose.model("Guides", guidesSchema);
