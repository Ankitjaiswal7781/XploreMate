import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Services } from "../models/services.model";
import { Guides } from "../models/guides.model";
import mongoose, { ObjectId } from "mongoose";

// Add Services
export const addServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).json({
        success: false,
        message: "Image is required",
      });
      return;
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    const service: any = await Services.create({
      name,
      description,
      price,
      image: imageUrl,
    });

    const guide = await Guides.findOne({ user: req.id });
    if (guide) {
      (guide.services as mongoose.Schema.Types.ObjectId[]).push(service._id);
      await guide.save();
    }

    res.status(201).json({
      success: true,
      message: "Service added successfully",
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit Services
export const editServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;
    const service = await Services.findById(id);

    if (!service) {
      res.status(404).json({
        success: false,
        message: "Service not found!",
      });
      return;
    }

    if (name) service.name = name;
    if (description) service.description = description;
    if (price) service.price = price;
    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      service.image = imageUrl;
    }
    await service.save();

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
