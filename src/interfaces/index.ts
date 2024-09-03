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
  