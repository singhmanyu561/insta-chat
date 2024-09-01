"use server";

import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

export const saveUser = async (payload: any) => {
  try {
    const user = new UserModel(payload);
    await user.save();
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
export const getCurrentUserFromMongoDB = async () => {
  try {
    const clerkUserData = await currentUser();
    const user = await UserModel.findOne({ clerkUserId: clerkUserData?.id });
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }

    const newUser = await saveUser({
      name: clerkUserData?.firstName + " " + clerkUserData?.lastName,
      email: clerkUserData?.emailAddresses[0]?.emailAddress,
      clerkUserId: clerkUserData?.id,
      profilePic: clerkUserData?.imageUrl,
    });

    if (newUser.success) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    } else {
      return {
        success: false,
        message: "User not found and failed to create new user",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
