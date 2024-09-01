import { getUserInfoById } from "@/server-actions/users";
import React from "react";
import UserBasicDetails from "./_components/UserBasicDetails";

const Profile = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const userInfoResponse = await getUserInfoById(params.id);
  const userInfo = userInfoResponse.data;
  return <div><UserBasicDetails user={userInfo}/></div>;
};

export default Profile;
