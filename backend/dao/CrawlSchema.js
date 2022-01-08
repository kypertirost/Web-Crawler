import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
    email: {
        type:String,
        required: true,
        lowercase: true,    
    },
    url: {
        type:String,
        required: true,
        lowercase: true,  
    },
    title: String,
    images: [String],
    hrefs : [String],
}, {
    timestamps: true,
});

export default mongoose.model("crawl_histories_dev", resultSchema);
