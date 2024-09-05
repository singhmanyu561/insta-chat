"use server";

import { connectToMongoDB } from "@/config/database";
import PostModel from "@/models/PostModel";

connectToMongoDB();

export const uploadNewPost = async (payload: any) => {
  try {
    
    await PostModel.create(payload);
    return {
      success: true,
      message: "User saved successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};