import { connectToMongoDB } from "@/config/database";
import TimeLineHeader from "./_components/TimeLineHeader";

connectToMongoDB();
export default async function Home() {
  return (
    <div className="grid lg:grid-cols-5">
      <div className="col col-span-3">
        <TimeLineHeader />
      </div>
    </div>
  );
}
