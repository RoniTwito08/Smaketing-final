import mongoose, { Schema } from "mongoose";
export interface MarketingHistoryEntry {
  date: Date;
  analysis: any;
  issues: string[];
  prompt: string;
  suggestions: any;
}
export interface Campaign {
  creatorId: string;
  campaignName: string;
  campaignContent: string;
  //campaignImage?: string;
  feedbacks?: mongoose.Types.ObjectId[];
  interestedUsers?: string[];
  budget: number;
  marketingLevel: string;
  campaginPurpose: string;
  actionToCall: string;
  targetAudience: string;
  targetGender: string;
  language: string;
  targetLocation: string;
  targetAge: string;
  landingPage: string;
}

const campaignSchema = new mongoose.Schema<Campaign>({
  creatorId: { type: String, required: true },
  campaignName: { type: String, required: true },
  campaignContent: { type: String, required: true },
  //campaignImage: { type: String },
  feedbacks: [{ type: Schema.Types.ObjectId, ref: "Feedback" }],
  interestedUsers: [{ type: String, default: [] }],
  budget: { type: Number, required: true },
  marketingLevel: { type: String, required: true },
  campaginPurpose: { type: String, required: true },
  actionToCall: { type: String, required: true },
  targetAudience: { type: String, required: true },
  targetGender: { type: String, required: true },
  language: { type: String, required: true },
  targetLocation: { type: String, required: true },
  targetAge: { type: String, required: true },
  landingPage: { type: String, required: true },
});

const campaignModel = mongoose.model<Campaign>("Campaigns", campaignSchema);

export default campaignModel;
