import mongoose from 'mongoose'

const serviceSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        default:""
    }

},{timestamps:true});

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);