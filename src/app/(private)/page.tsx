import { connectToMongoDB } from "@/config/database";

connectToMongoDB();
export default async function Home() {
  return <div className="">Homepage</div>;
}
