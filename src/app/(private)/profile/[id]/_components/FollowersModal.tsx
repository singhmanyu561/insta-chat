import Spinner from "@/components/spinner";
import { UserType } from "@/interfaces";
import { getFollowersOfUser } from "@/server-actions/users";
import { message, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FollowersModal = ({
  showFollowersModal,
  setShowFollowersModal,
  user,
}: {
  showFollowersModal: boolean;
  setShowFollowersModal: (value: boolean) => void;
  user: UserType;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [followers, setFollowers] = useState<UserType[]>([]);

  const router = useRouter();

  const getFollowers = async () => {
    try {
      setLoading(true);
      const response = await getFollowersOfUser(user._id);
      if (response.success) {
        setFollowers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showFollowersModal) {
      getFollowers();
    }
  }, [showFollowersModal]);

  return (
    <Modal
      title="FOLLOWERS"
      open={showFollowersModal}
      onCancel={() => setShowFollowersModal(false)}
      centered
      footer={null}
    >
      {loading && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!loading && followers.length === 0 && (
        <p className="text-center text-gray-500">No followers</p>
      )}

      <div className="flex flex-col gap-5">
        {followers.map((follower) => (
          <div
            className="bg-gray-100 flex gap-5 items-center border border-gray-300 border-solid p-3 rounded cursor-pointer"
            onClick={() => router.push(`/profile/${follower._id}`)}
          >
            <img
              src={follower.profilePic}
              alt="profile-pic"
              className="w-12 h-12 rounded-full"
            />
            <div className="text-sm">
              <p className="font-semibold">{follower.name}</p>
              <p className="text-sm text-gray-500">{follower.email}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default FollowersModal;
