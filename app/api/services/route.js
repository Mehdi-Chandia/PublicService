import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Service from "@/models/Service";
// import cloudinary from "@/lib/cloudinary";
import cloudinary from "@/app/lib/cloudinary";
import {dbConnection} from "@/app/lib/mongodb";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        await dbConnection()

        const formData = await request.formData();

        const title = formData.get("title");
        const description = formData.get("description");
        const category = formData.get("category");
        const price = formData.get("price");
        const location = formData.get("location");
        const imageFile = formData.get("image");

        let imageUrl = "";

        if (imageFile) {
            const bytes = Buffer.from(await imageFile.arrayBuffer());
            const base64 = `data:${imageFile.type};base64,${bytes.toString("base64")}`;

            const upload = await cloudinary.uploader.upload(base64, {
                folder: "services",
            });

            imageUrl = upload.secure_url;
        }

        const newService = await Service.create({
            title,
            description,
            category,
            price,
            location,
            image: imageUrl,
            owner: session.user.id,
        });

        return Response.json(
            {
                success: true,
                data: newService,
                message: "Successfully created",
            },
            { status: 201 }
        );

    } catch (err) {
        console.error(err);
        return Response.json(
            {
                success: false,
                message: "Failed to create service",
            },
            { status: 500 }
        );
    }
}


export async function GET(request) {
    try {
       await dbConnection()

        const getServices=await Service.find()
            .populate("owner","email name")
            .sort({ createdAt: -1 })

        return Response.json({
            success: true,
            message: "Successfully retrieved services",
            data: getServices
        })
    }catch (error) {
        console.error(error);
        return Response.json({
            success: false,
            message: "Failed to retrieve services",
        })
    }
}