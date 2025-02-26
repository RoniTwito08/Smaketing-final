import mongoose from "mongoose";

export interface PostInterface {
    _id?: string;
    userId: string;
    content: string;
    image?: string;
    tags?: string[];
    createdAt?: Date;
  
}

const CampaignSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: '',
    },
    tags:{
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Campaign = mongoose.model("Post", CampaignSchema);
export default Campaign;
    