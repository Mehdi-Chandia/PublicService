import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    username:{
       type:String,
        required: true,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    }
},{timestamps:true});

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);