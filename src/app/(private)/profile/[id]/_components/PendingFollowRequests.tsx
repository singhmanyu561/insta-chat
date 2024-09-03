"use client";
import { UserType } from "@/interfaces";
import {
  acceptFollowRequest,
  rejectFollowRequest,
} from "@/server-actions/followRequests";
import { getFollowRequestsReceived } from "@/server-actions/users";
import { UsersStoreType, useUsersStore } from "@/store/users";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type LoadingTypes = "accept follow request" | "rejecting follow request" | "";

const PendingFollowRequests = ({ user }: { user: UserType }) => {
  const [followRequests, setFollowRequests] = useState([]);
  const { loggedInUserData }: UsersStoreType = useUsersStore();
  const [loading, setLoading] = useState<LoadingTypes>("");
  const router = useRouter();

  if (user?._id !== loggedInUserData?._id) {
    return null;
  }

  const fetchFollowRequests = async () => {
    try {
      const response = await getFollowRequestsReceived(
        loggedInUserData?._id || ""
      );
      if (response.success) {
        setFollowRequests(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleAcceptFollowRequest = async (senderId: string) => {
    try {
      setLoading("accept follow request");
      const response = await acceptFollowRequest({
        followRequestReceiverId: loggedInUserData?._id || "",
        followRequestSenderId: senderId,
      });
      if (response.success) {
        message.success(response.message);
        fetchFollowRequests();
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading("");
    }
  };

  const handleRejectFollowRequest = async (senderId: string) => {
    try {
      setLoading("rejecting follow request");
      const response = await rejectFollowRequest({
        followRequestReceiverId: loggedInUserData?._id || "",
        followRequestSenderId: senderId,
      });
      if (response.success) {
        message.success(response.message);
        fetchFollowRequests();
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading("");
    }
  };

  useEffect(() => {
    fetchFollowRequests();
  }, []);

  return (
    <div className="mt-10 p-5 bg-gray-50 border border-gray-200 border-solid">
      <h1 className="text-sm text-primary font-bold">
        Pending Follow Requests
      </h1>
      {followRequests.length === 0 && !loading && (
        <span className="text-gray-500 text-sm">
          No pending follow requests
        </span>
      )}
      {followRequests.length > 0 && (
        <div className="flex flex-wrap gap-5 mt-7">
          {followRequests.map((sender: UserType) => (
            <div className="flex gap-5 items-center bg-gray-200 p-2 border border-solid border-gray-200">
              <img
                src={sender.profilePic}
                alt={sender.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col gap-1">
                <span className="text-gray-700 text-sm">{sender.name}</span>
                <div className="flex gap-5">
                  <Button
                    size="small"
                    danger
                    loading={loading === "rejecting follow request"}
                    onClick={() => handleRejectFollowRequest(sender._id)}
                  >
                    Reject
                  </Button>
                  <Button
                    size="small"
                    onClick={() => router.push(`/profile/${sender._id}`)}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="small"
                    className="bg-primary text-white"
                    loading={loading === "accept follow request"}
                    onClick={() => handleAcceptFollowRequest(sender._id)}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingFollowRequests;
