import { getUserInfoById } from "@/server-actions/users";
import React from "react";
import UserBasicDetails from "./_components/UserBasicDetails";
import PendingFollowRequests from "./_components/PendingFollowRequests";

const Profile = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const userInfoResponse = await getUserInfoById(params.id);
  const userInfo = userInfoResponse.data;
  return (
    <div>
      <UserBasicDetails user={userInfo} />
      <PendingFollowRequests user={userInfo} />
    </div>
  );
};

export default Profile;
