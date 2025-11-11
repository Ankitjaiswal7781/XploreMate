import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Guides } from "../models/guides.model";
import { Booking } from "../models/booking.model";

// Create Guide
export const createGuide = async (req: Request, res: Response): Promise<void> => {
    try {
        const { guideName, city, country, tourDuration, servicesTypes } = req.body;
        const file = req.file;

        if (!file) {
            res.status(400).json({ success: false, message: "Image is required" });
            return;
        }

        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        await Guides.create({
            user: req.id,
            guideName,
            city,
            country,
            tourDuration,
            servicesTypes: JSON.parse(servicesTypes),
            imageUrl
        });

        res.status(201).json({ success: true, message: "Guide Added Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Guide
export const getGuide = async (req: Request, res: Response): Promise<void> => {
    try {
        const guide = await Guides.findOne({ user: req.id }).populate('services');
        if (!guide) {
            res.status(404).json({ success: false,guide:[], message: "Guide not found" });
            return;
        }

        res.status(200).json({ success: true, guide });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update Guide
export const updateGuide = async (req: Request, res: Response): Promise<void> => {
    try {
        const { guideName, city, country, tourDuration, servicesTypes } = req.body;
        const file = req.file;
        const guide = await Guides.findOne({ user: req.id });

        if (!guide) {
            res.status(404).json({ success: false, message: "Guide not found" });
            return;
        }

        guide.guideName = guideName;
        guide.city = city;
        guide.country = country;
        guide.tourDuration = tourDuration;
        guide.servicesTypes = JSON.parse(servicesTypes);

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            guide.imageUrl = imageUrl;
        }

        await guide.save();
        res.status(200).json({ success: true, message: "Guide updated successfully", guide });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Guide Bookings
export const getGuideBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const guide = await Guides.findOne({ user: req.id });

        if (!guide) {
            res.status(404).json({ success: false, message: "Guide not found" });
            return;
        }

        const bookings = await Booking.find({ guide: guide._id }).populate('guide').populate('user');
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update Booking Status
export const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            res.status(404).json({ success: false, message: "Booking not found" });
            return;
        }

        booking.status = status;
        await booking.save();
        res.status(200).json({ success: true, status:booking.status, message: "Booking status updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Search Guide
export const searchGuide = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = (req.query.searchQuery as string) || "";
        const selectedServiceTypes = ((req.query.selectedServiceTypes as string) || "").split(",").filter(service => service);

        const query: any = {};

        if (searchText) {
            query.$or = [
                { guideName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } }
            ];
        }

        if (searchQuery) {
            query.$or = [
                { guideName: { $regex: searchQuery, $options: 'i' } },
                { servicesTypes: { $regex: searchQuery, $options: 'i' } }
            ];
        }

        if (selectedServiceTypes.length > 0) {
            query.servicesTypes = { $in: selectedServiceTypes };
        }

        const guides = await Guides.find(query);
        res.status(200).json({ success: true, data: guides });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Single Guide
export const getSingleGuide = async (req: Request, res: Response): Promise<void> => {
    try {
        const guideId = req.params.id;
        const guide = await Guides.findById(guideId).populate({
            path: 'services',
            options: { sort: { createdAt: -1 } }
        });

        if (!guide) {
            res.status(404).json({ success: false, message: "Guide not found" });
            return;
        }

        res.status(200).json({success:true, guide});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
