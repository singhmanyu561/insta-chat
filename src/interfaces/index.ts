export interface UserType {
    _id: string;
    name: string;
    email: string;
    bio: string;
    profilePic: string;
    followers: string[];
    following: string[];
    followRequestSent: string[];
    followRequestsReceived: string[];
    isPrivateAccount: boolean;
    createdAt: string;
  }
export interface PostType {
    _id: string;
    user: UserType;
    media: string[];
    caption: string;
    hashTags: string[];
    tags: UserType[];
    likedBy: UserType[];
    commentsCount: number;
    sharesCount: number;
    isAchieved: boolean;
    createdAt: string;
  }
  