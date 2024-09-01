import { uploadImageToFirebase } from "@/helpers/uploads";
import { UserType } from "@/interfaces";
import { updateUserProfile } from "@/server-actions/users";
import { Input, message, Modal, Switch, Upload } from "antd";
import React, { useState } from "react";

const EditProfileModal = ({
  user,
  showEditProfileModal,
  setShowEditProfileModal,
}: {
  user: UserType;
  showEditProfileModal: boolean;
  setShowEditProfileModal(value: boolean): void;
}) => {
  const [loading = false, setLoading] = useState<boolean>(false);
  const [bio = "", setBio] = useState(user?.bio);
  const [newProfilePicFile = null, setNewProfilePicFile] = useState(null);
  const [isPrivateAccount = false, setIsPrivateAccount] = useState(
    user?.isPrivateAccount
  );

  const uploadHandler = async () => {
    try {
      setLoading(true);
      const payload: any = {
        bio,
        isPrivateAccount,
      };

      if (newProfilePicFile) {
        payload.profilePic = await uploadImageToFirebase(newProfilePicFile);
      }

      const response = await updateUserProfile({ payload, userId: user?._id });

      if (response.success) {
        message.success(response.message);
        setShowEditProfileModal(false);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Modal
        title="EDIT PROFILE"
        open={showEditProfileModal}
        onCancel={() => setShowEditProfileModal(false)}
        centered
        okText="Save"
        onOk={uploadHandler}
        okButtonProps={{loading}}
        cancelButtonProps={{disabled: loading}}
      >
        <hr className="border-solid border-gray-300 my-3" />
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-gray-500 text-sm">Bio</span>
            <Input.TextArea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Add your bio here..."
            />
          </div>
          <div className="flex gap-5">
            {!newProfilePicFile && (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-24 h-24 object-cover"
              />
            )}
            <Upload
              listType="picture-card"
              beforeUpload={(file: any) => {
                setNewProfilePicFile(file);
                return false;
              }}
              onRemove={() => setNewProfilePicFile(null)}
            >
              <span className="text-gray-700 text-xs">Change</span>
            </Upload>
          </div>
          <div className="flex gap-3">
            <span>Is Private Account</span>
            <Switch checked={isPrivateAccount} onChange={setIsPrivateAccount} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditProfileModal;
