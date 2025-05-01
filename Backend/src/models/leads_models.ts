import mongoose from "mongoose";

export interface Lead {
    userId: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: Date;
}

const leadSchema = new mongoose.Schema<Lead>({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const LeadModel = mongoose.model<Lead>("Lead", leadSchema);
export default LeadModel;