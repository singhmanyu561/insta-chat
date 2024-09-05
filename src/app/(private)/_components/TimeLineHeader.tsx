"use client";

import { UsersStoreType, useUsersStore } from "@/store/users";
import { Button } from "antd";
import React, { useState } from "react";
import UploadPostModal from "./UploadPostModal";

const TimeLineHeader = () => {
  const { loggedInUserData }: UsersStoreType = useUsersStore();
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl text-gray-500">
        Here is your timeline{" "}
        <b className="text-primary">{loggedInUserData?.name}</b>
      </h1>
      <Button type="primary" className="h-8 bg-primary" onClick={() => setShowNewPostModal(true)}>
        Upload Post
      </Button>

      {showNewPostModal && (
        <UploadPostModal
          showNewPostModal={showNewPostModal}
          setShowNewPostModal={setShowNewPostModal}
          user={loggedInUserData!}
        />
      )}
    </div>
  );
};

export default TimeLineHeader;
