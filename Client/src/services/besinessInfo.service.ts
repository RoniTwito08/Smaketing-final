import axios from "axios";
import { User } from "../types/user";
import { CredentialResponse } from "@react-oauth/google";
import { AuthResponse } from "../types/user";
import { config } from "../config";
import { FormValues } from "../types/businessInfo";

export const businessInfoService = {
  async createBusinessInfo(data: FormValues, userId: string, token: string) {
    const formData = new FormData();

    // שדות טקסט רגילים
    for (const key in data) {
      if (key === "logoFiles") continue;

      const value = data[key as keyof FormValues];
      if (value === undefined || value === null) continue;

      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item.toString());
        });
      } else if (typeof value === "object") {
        continue;
      } else {
        formData.append(key, value.toString());
      }
    }

    // קבצים
    if (data.logoFile) {
      formData.append("logo", data.logoFile);
    }

    if (data.businessImageFiles && data.businessImageFiles.length > 0) {
      Array.from(data.businessImageFiles).forEach((file) => {
        formData.append("businessImages", file);
      });
    }

    console.log("נתוני הטופס הסופיים:", formData);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const API_URL = config.apiUrl;
    const response = await fetch(`${API_URL}/business-info/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "שגיאה בשליחת הטופס לשרת");
    }

    return response.json(); // נחזיר את התגובה מהשרת
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
