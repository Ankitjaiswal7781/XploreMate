import mongoose, { Document } from "mongoose";

export interface IServices {
  // _id:mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface IServicesDocument extends IServices, Document {
  createdAt: Date;
  updatedAt: Date;
}

const servicesSchema = new mongoose.Schema<IServicesDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Services = mongoose.model("Services", servicesSchema);
