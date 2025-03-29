import businessInfoModel from "../models/businessInfo_models";

export async function findBusinessInfoByUserId(userId: string) {
  const businessInfo = await businessInfoModel.findOne({ userId });
  if (!businessInfo) throw new Error("Business info not found");
  return businessInfo;
}
