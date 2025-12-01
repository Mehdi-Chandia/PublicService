// app/api/services/[id]/route.js
import { dbConnection } from "@/app/lib/mongodb";
import Service from "@/models/Service";
import Review from "@/models/Review";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(request, { params }) {
    try {
        await dbConnection();
        const { id } = await params;

        const objectId = new mongoose.Types.ObjectId(id);

        const service = await Service.findOne({ _id: objectId }).populate("owner", "email name");

        if (!service) {
            return Response.json({
                success: false,
                message: "Service not found",
            }, { status: 404 });
        }

        const reviews = await Review.find({ service: objectId }).sort({ createdAt: -1 });

        return Response.json({
            success: true,
            service: service,
            reviews: reviews
        }, { status: 200 });

    } catch (err) {
        console.error("API Error:", err);
        return Response.json({
            success: false,
            message: "Server error",
        }, { status: 500 });
    }
}