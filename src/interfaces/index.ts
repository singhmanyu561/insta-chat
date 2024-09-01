export interface UserType {
    _id: string;
    name: string;
    email: string;
    bio: string;
    profilePic: string;
    followers: string[];
    following: string[];
    followRequetsSent: string[];
    followRequestsReceived: string[];
    isPrivateAccount: boolean;
    createdAt: string;
  }
  