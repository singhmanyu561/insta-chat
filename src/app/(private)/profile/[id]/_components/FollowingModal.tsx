import Spinner from "@/components/spinner";
import { UserType } from "@/interfaces";
import { getFollowingOfUser } from "@/server-actions/users";
import { message, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FollowingModal = ({
  showFollowingModal,
  setShowFollowingModal,
  user,
}: {
  showFollowingModal: boolean;
  setShowFollowingModal: (value: boolean) => void;
  user: UserType;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [following, setFollowing] = useState<UserType[]>([]);

  const router = useRouter();

  const getFollowing = async () => {
    try {
      setLoading(true);
      const response = await getFollowingOfUser(user._id);
      if (response.success) {
        setFollowing(response.data);
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
    if (showFollowingModal) {
      getFollowing();
    }
  }, [showFollowingModal]);

  return (
    <Modal
      title="FOLLOWING"
      open={showFollowingModal}
      onCancel={() => setShowFollowingModal(false)}
      centered
      footer={null}
    >
      {loading && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!loading && following.length === 0 && (
        <p className="text-center text-gray-500">
          You are not following anyone
        </p>
      )}

      <div className="flex flex-col gap-5">
        {following.map((followedUser) => (
          <div
            className="bg-gray-100 flex gap-5 items-center border border-gray-300 border-solid p-3 rounded cursor-pointer"
            onClick={() => router.push(`/profile/${followedUser._id}`)}
          >
            <img
              src={followedUser.profilePic}
              alt="profile-pic"
              className="w-12 h-12 rounded-full"
            />
            <div className="text-sm">
              <p className="font-semibold">{followedUser.name}</p>
              <p className="text-sm text-gray-500">{followedUser.email}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default FollowingModal;
