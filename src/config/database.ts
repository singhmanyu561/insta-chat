import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("Connected to mongoDB")
  } catch (error: any) {
    console.error("Error connecting to mongoDB", error.message);
  }
};
