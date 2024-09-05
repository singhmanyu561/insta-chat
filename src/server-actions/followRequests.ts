"use server";

import { connectToMongoDB } from "@/config/database";
import UserModel from "@/models/UserModel";
import { revalidatePath } from "next/cache";

connectToMongoDB();

export const sendFollowRequest = async ({
  followRequestSenderId,
  followRequestReceiverId,
}: {
  followRequestSenderId: string;
  followRequestReceiverId: string;
}) => {
  try {
    // Add receiver id to senders followRequestSent
    const newSenderDoc = await UserModel.findByIdAndUpdate(
      followRequestSenderId,
      {
        $push: { followRequestSent: followRequestReceiverId },
      },
      { new: true }
    );

    // Add sender id to receivers followRequestReceived
    await UserModel.findByIdAndUpdate(followRequestReceiverId, {
      $push: { followRequestReceived: followRequestSenderId },
    });

    revalidatePath(`/profile/${followRequestReceiverId}`);

    return {
      success: true,
      message: "Follow request sent successfully",
      data: JSON.parse(JSON.stringify(newSenderDoc)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const acceptFollowRequest = async ({
  followRequestSenderId,
  followRequestReceiverId,
}: {
  followRequestSenderId: string;
  followRequestReceiverId: string;
}) => {
  try {
    // Add sender id to receivers followers and remove from followRequestReceived
    await UserModel.findByIdAndUpdate(followRequestReceiverId, {
      $push: { followers: followRequestSenderId },
      $pull: { followRequestReceived: followRequestSenderId },
    });

    // Add receiver id to sender's following and remove from followRequestSent
    await UserModel.findByIdAndUpdate(followRequestSenderId, {
      $push: { following: followRequestReceiverId },
      $pull: { followRequestSent: followRequestReceiverId },
    });

    revalidatePath(`/profile/${followRequestReceiverId}`);

    return {
      success: true,
      message: "Follow request accepted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const rejectFollowRequest = async ({
  followRequestSenderId,
  followRequestReceiverId,
}: {
  followRequestSenderId: string;
  followRequestReceiverId: string;
}) => {
  try {
    // Remove sender id from followRequestReceived
    await UserModel.findByIdAndUpdate(followRequestReceiverId, {
      $pull: { followRequestReceived: followRequestSenderId },
    });

    // Remove receiver id from followRequestSent
    await UserModel.findByIdAndUpdate(followRequestSenderId, {
      $pull: { followRequestSent: followRequestReceiverId },
    });

    return {
      success: true,
      message: "Follow request rejected successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const cancelFollowRequest = async ({
  followRequestSenderId,
  followRequestReceiverId,
}: {
  followRequestSenderId: string;
  followRequestReceiverId: string;
}) => {
  try {
    // Remove receiver id from sender's followRequestSent
    const newSenderDoc = await UserModel.findByIdAndUpdate(
      followRequestSenderId,
      {
        $pull: { followRequestSent: followRequestReceiverId },
      },
      { new: true }
    );

    // Remove sender id from receiver's followRequestReceived
    await UserModel.findByIdAndUpdate(followRequestReceiverId, {
      $pull: { followRequestReceived: followRequestSenderId },
    });

    return {
      success: true,
      message: "Follow request cancelled successfully",
      data: JSON.parse(JSON.stringify(newSenderDoc)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const unFollowUser = async ({
  senderId = "",
  receiverId = "",
}: {
  senderId: string;
  receiverId: string;
}) => {
  try {
    // Remove receiver id from sender's following
    const newSenderDoc = await UserModel.findByIdAndUpdate(
      senderId,
      {
        $pull: { following: receiverId },
      },
      { new: true }
    );

    // Remove sender id from receiver's followers
    await UserModel.findByIdAndUpdate(receiverId, {
      $pull: { followers: senderId },
    });

    revalidatePath(`/profile/${receiverId}`);

    return {
      success: true,
      message: "User unfollowed successfully",
      data: JSON.parse(JSON.stringify(newSenderDoc)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
