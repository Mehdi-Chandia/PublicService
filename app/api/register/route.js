import mongoose from 'mongoose';
import {dbConnection} from "@/app/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request){
    try {
        const {name, email, password,role} =await request.json()
        await dbConnection()

        const existingUser = await User.findOne({email})
        if(existingUser){
            return Response.json({error: "User already exists"},{status:409});
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser=new User({
            name,
            email,
            password: hashedPassword,
            role
        })
        await newUser.save()
        return Response.json({
            success: true,
            message: 'User registered successfully.',
            data:newUser
        },{status:201})

    }catch(err){
return Response.json({
    success: false,
    message: 'error creating User',
},{status:500});
    }
}