import axios from "axios";
import { User } from "../types/user";
import { CredentialResponse } from "@react-oauth/google";
import { AuthResponse } from "../types/user";
import { config } from "../config";
import { FormValues } from "../types/businessInfo";

export const businessInfoService = {
  async createBusinessInfo(userId: string, data: FormData, token: string) {
    const formData = new FormData();

    // הוספת שדות רגילים
    for (const [key, value] of Object.entries(data)) {
      if (key === "logoFiles" && value instanceof FileList) {
        Array.from(value).forEach((file) => {
          formData.append("logoFiles", file);
        });
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item); // תואם לשדות כמו socialMediaAccounts
        });
      } else if (value !== undefined) {
        formData.append(key, value as string);
      }
    }

    const response = await fetch(`${config.apiUrl}/business-info/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // שימי לב: לא שמים 'Content-Type' כששולחים FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "שגיאה באתחול המידע");
    }

    return await response.json();
  },

  async getBusinessInfo(userId: string, token: string) {
    const response = await fetch(`${config.apiUrl}/business-info/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "שגיאה בקבלת המידע");
    }

    return await response.json();
  },

  async updateBusinessInfo(
    userId: string,
    data: Partial<FormValues>,
    token: string
  ) {
    const response = await fetch(`${config.apiUrl}/business-info/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "שגיאה בעדכון המידע");
    }

    return await response.json();
  },
};
