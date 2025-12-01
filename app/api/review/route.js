// app/api/reviews/route.js
import { dbConnection } from "@/app/lib/mongodb";
import Review from "@/models/Review";
import mongoose from "mongoose"; // ← IMPORT THIS

export async function POST(request) {
    try {
        await dbConnection();
        const { serviceId, comment, rating, username } = await request.json()

        const serviceObjectId = new mongoose.Types.ObjectId(serviceId);

        const newReview = await Review.create({
            service: serviceObjectId,
            username,
            comment,
            rating
        })

        return new Response(JSON.stringify({
            success: true,
            data: newReview,
            message: "Successfully created review"
        }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });

    } catch(err) {
        console.error("Review creation error:", err);
        return new Response(JSON.stringify({
            success: false,
            message: "Failed to create review: " + err.message
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}