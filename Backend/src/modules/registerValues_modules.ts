import mongoose, { Schema } from "mongoose";

const formValuesSchema = new Schema(
  {
    userId: { type: String, required: true },
    // שלב 1
    businessName: { type: String, required: true },
    businessType: { type: String, required: true },
    businessAddress: { type: String, required: true },
    businessField: { type: String, required: true },
    businessFieldDetails: { type: String },
    serviceAreas: { type: String, required: true },

    // שלב 2
    ageGroup: { type: String, required: true },
    gender: { type: String, required: true },
    specificMarketSegment: { type: String, required: true },
    typicalCustomers: { type: String, required: true },

    // שלב 3
    serviceDescription: { type: String, required: true },
    uniqueService: { type: String, required: true },
    specialPackages: { type: String, required: true },
    incentives: { type: String, required: true },

    // שלב 4
    logoFiles: {
      type: [String],
      default: [],
    },
    designPreferences: { type: String },
    socialMediaAccounts: {
      type: [String],
      default: [],
    },

    // שלב 5
    objective: {
      type: String,
      enum: [
        "brandAwareness",
        "reach",
        "siteVisit",
        "engagement",
        "videoViews",
        "sales",
      ],
      default: undefined,
    },
  },
  {
    // אם לא צריך _id נפרד לתתי-מסמכים, אפשר להגדיר:
    _id: false,
  }
);

export default formValuesSchema;
