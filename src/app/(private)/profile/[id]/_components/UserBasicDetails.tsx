"use client";
import { UserType } from "@/interfaces";
import { UsersStoreType, useUsersStore } from "@/store/users";
import { Button } from "antd";
import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal";

const UserBasicDetails = ({ user }: { user: UserType }) => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const { loggedInUserData }: UsersStoreType = useUsersStore();
  const showEditProfile = user?._id === loggedInUserData?._id;

  return (
    <div className="flex gap-10 lg:items-center lg:flex-row flex-col lg:px-5">
      <div>
        <img
          src={user.profilePic}
          alt="profile-pic"
          className="h-32 w-32 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-5">
          <span className="text-primary font-bold text-xl">{user.name}</span>
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
        </div>
        <div className="flex gap-5 text-gray-500 text-sm">
          <div className="flex gap-1">
            <span>0</span>
            <span>Posts</span>
          </div>
          <div className="flex gap-1">
            <span>{user.followers.length}</span>
            <span className="underline cursor-pointer">Followers</span>
          </div>
          <div className="flex gap-1">
            <span>{user.following.length}</span>
            <span className="underline cursor-pointer">Following</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          {user?.bio || "This user has no bio yet"}
        </p>
      </div>
      {showEditProfileModal && (<EditProfileModal user={user} showEditProfileModal={showEditProfileModal} setShowEditProfileModal={setShowEditProfileModal}/>)}
    </div>
  );
};

export default UserBasicDetails;
