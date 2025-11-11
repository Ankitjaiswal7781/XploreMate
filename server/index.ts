import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import guideRoute from "./routes/guide.route";
import serviceRoute from "./routes/service.route";
import ragRoutes from "./routes/rag.route";
import bookingRoute from "./routes/booking.route";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//default-middlewares
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//API
app.use("/api/v1/user", userRoute);
app.use("/api/v1/guide", guideRoute);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/rag", ragRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at port ${PORT}`);
});
