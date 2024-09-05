import { uploadImageToFirebase } from "@/helpers/uploads";
import { UserType } from "@/interfaces";
import { uploadNewPost } from "@/server-actions/posts";
import { getFollowingOfUser } from "@/server-actions/users";
import { Modal, Upload, Input, message, Select } from "antd";
import React, { Dispatch, useEffect, useState } from "react";

const UploadPostModal = ({
  showNewPostModal,
  setShowNewPostModal,
  user,
}: {
  showNewPostModal: boolean;
  setShowNewPostModal: Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}) => {
  const [media, setMedia] = useState<any[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [hashTags, setHashTags] = useState<string>("");
  const [taggedUserIds, setTaggedUserIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [following = [], setFollowing] = useState<any[]>();

  const handleUpload = async () => {
    try {
      setLoading(true);
      let mediaUrls: string[] = [];
      for (let i = 0; i < media.length; i++) {
        const url = await uploadImageToFirebase(media[i]);
        mediaUrls.push(url);
      }
      const payload = {
        user: user._id,
        media: mediaUrls,
        caption,
        hashTags: hashTags.split(","),
        tags: taggedUserIds,
      };

      const response = await uploadNewPost(payload);
      if (response.success) {
        message.success("Post uploaded successfully");
        setShowNewPostModal(false);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getFollowing = async () => {
    try {
      const response = await getFollowingOfUser(user._id);
      if (response.success) {
        const tempFollowing = response.data.map((user: UserType) => ({
          label: user.name,
          value: user._id,
        }));
        setFollowing(tempFollowing);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getFollowing();
  }, []);
  return (
    <Modal
      title="UPLOAD NEW POST"
      open={showNewPostModal}
      onCancel={() => setShowNewPostModal(false)}
      centered
      okText="Upload"
      onOk={handleUpload}
      okButtonProps={{ loading, disabled: media.length === 0 }}
    >
      <hr className="border border-x-gray-300 my-3 border-solid" />
      <div className="flex flex-col gap-5">
        <Upload
          listType="picture-card"
          beforeUpload={(file) => {
            setMedia((prev) => [...prev, file]);
            return false;
          }}
          onRemove={(file) => {
            setMedia((prev) => prev.filter((f) => f.name !== file.name));
          }}
          multiple
        >
          <div className="span text-xs text-gray-500">Upload Media</div>
        </Upload>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Caption</span>
          <Input.TextArea
            placeholder="Caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Tag Users</span>
          <Select
            mode="multiple"
            placeholder="Tag Users"
            value={taggedUserIds}
            onChange={(value) => {
              setTaggedUserIds(value);
            }}
            options={following}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Hashtags</span>
          <Input.TextArea
            placeholder="Hash Tags (comma separated)"
            value={hashTags}
            onChange={(e) => setHashTags(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UploadPostModal;
