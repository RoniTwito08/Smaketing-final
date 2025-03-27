import businessInfoModel from "../models/businessInfo_models";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const createBusinessInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    console.log("userID: ", userId);
    const businessInfoData = {
      ...req.body,
      userId,
    };
    console.log("businessInfoData: ", businessInfoData);
    const businessInfo = new businessInfoModel(businessInfoData);
    await businessInfo.save();

    return res.status(201).json({
      message: "Business info created successfully",
      data: businessInfo,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return res
        .status(400)
        .json({ message: "יש למלא את כל השדות", details: messages });
    }
    console.error("Error creating business info:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateBusinessInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const businessInfo = await businessInfoModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    );
    if (!businessInfo) {
      return res.status(404).json({ message: "Business info not found" });
    }
    return res.json({
      message: "Business info updated successfully",
      data: businessInfo,
    });
  } catch (error) {
    console.error("Error updating business info:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getBusinessInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const businessInfo = await businessInfoModel.findById(id);
    if (!businessInfo) {
      return res.status(404).json({ message: "Business info not found" });
    }
    return res.json({ data: businessInfo });
  } catch (error) {
    console.error("Error retrieving business info:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export default { createBusinessInfo, updateBusinessInfo, getBusinessInfo };
