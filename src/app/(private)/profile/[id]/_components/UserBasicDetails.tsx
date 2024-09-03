"use client";
import { UserType } from "@/interfaces";
import { UsersStoreType, useUsersStore } from "@/store/users";
import { Button, message } from "antd";
import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import {
  cancelFollowRequest,
  sendFollowRequest,
  unFollowUser,
} from "@/server-actions/followRequests";

const UserBasicDetails = ({ user }: { user: UserType }) => {
  const [loading, setLoading] = useState<
    "sending-follow-request" | "cancel-follow-request" | "unfollow-request" | ""
  >("");
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const { loggedInUserData, setLoggedInUserData }: UsersStoreType =
    useUsersStore();
  const showEditProfile = user?._id === loggedInUserData?._id;

  const followRequestSent = loggedInUserData?.followRequestSent?.includes(
    user._id
  );

  const alreadyFollowing = loggedInUserData?.following?.includes(user._id);
  const showFollowBtn =
    user?._id !== loggedInUserData?._id &&
    !followRequestSent &&
    !alreadyFollowing;

  const followHandler = async () => {
    try {
      setLoading("sending-follow-request");
      const response = await sendFollowRequest({
        followRequestReceiverId: user._id,
        followRequestSenderId: loggedInUserData?._id || "",
      });
      if (response.success) {
        message.success(response.message);
        setLoggedInUserData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading("");
    }
  };

  const unFollowHandler = async () => {
    try {
      setLoading("unfollow-request");
      const response = await unFollowUser({
        senderId: loggedInUserData?._id || "",
        receiverId: user._id,
      });
      if (response.success) {
        message.success(response.message);
        setLoggedInUserData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading("");
    }
  };

  const cancelFollowRequestHandler = async () => {
    try {
      setLoading("cancel-follow-request");
      const response = await cancelFollowRequest({
        followRequestReceiverId: user._id,
        followRequestSenderId: loggedInUserData?._id || "",
      });
      if (response.success) {
        message.success(response.message);
        setLoggedInUserData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="flex gap-10 lg:items-center lg:flex-row flex-col lg:px-5">
      <div>
        <img
          src={user?.profilePic}
          alt="profile-pic"
          className="h-32 w-32 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-5 items-center">
          <span className="text-primary font-bold text-xl">{user?.name}</span>
          {showEditProfile && (
            <Button
              type="primary"
              size="small"
              className="bg-primary"
              onClick={() => setShowEditProfileModal(true)}
            >
              Edit profile
            </Button>
          )}
          {showFollowBtn && (
            <Button
              type="primary"
              size="small"
              className="bg-primary"
              loading={loading === "sending-follow-request"}
              onClick={followHandler}
            >
              Follow
            </Button>
          )}
          {followRequestSent && (
            <div className="flex items-center gap-5">
              <span className="text-gray-500 text-sm font-semibold">
                Follow Request Sent
              </span>
              <Button
                type="primary"
                size="small"
                danger
                loading={loading === "cancel-follow-request"}
                onClick={cancelFollowRequestHandler}
              >
                Cancel Request
              </Button>
            </div>
          )}
          {alreadyFollowing && (
            <div className="flex items-center gap-5">
              <span className="text-gray-500 text-sm font-semibold">
                Following
              </span>
              <Button
                type="primary"
                size="small"
                danger
                loading={loading === "unfollow-request"}
                onClick={unFollowHandler}
              >
                Unfollow
              </Button>
            </div>
          )}
        </div>
        <div className="flex gap-5 text-gray-500 text-sm font-bold">
          <div className="flex gap-1">
            <span>0</span>
            <span>Posts</span>
          </div>
          <div className="flex gap-1">
            <span>{user?.followers?.length}</span>
            <span className="underline cursor-pointer">Followers</span>
          </div>
          <div className="flex gap-1">
            <span>{user?.following?.length}</span>
            <span className="underline cursor-pointer">Following</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          {user?.bio || "This user has no bio yet"}
        </p>
      </div>
      {showEditProfileModal && (
        <EditProfileModal
          user={user}
          showEditProfileModal={showEditProfileModal}
          setShowEditProfileModal={setShowEditProfileModal}
        />
      )}
    </div>
  );
};

export default UserBasicDetails;
