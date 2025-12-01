import mongoose from 'mongoose';


const Uri=process.env.MONGODB_URI

if(!Uri){
    throw new Error('MongoDB URI is not provided.');
}

let isConnected=false;


export const dbConnection=async ()=>{
    if(isConnected) return;
    try {
        const db=await mongoose.connect(Uri);
        isConnected=db.connections[0].readyState;
        console.log('mongodb Connected');
    }catch(err){
        console.log("mongodb connection failed:", err);
    }
}