import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <div className="bg-primary h-full w-full flex items-center justify-center">
        <div className="p-2">
          <div className="flex justify-center">
            <img
              src="https://yt3.googleusercontent.com/ytc/AIdro_lEHROLESqfi5ufqdVIm64if9bYf6vjye-uXbD5y2fL2A=s900-c-k-c0x00ffffff-no-rj"
              alt="chit-chat-image"
              className="h-24"
            />
          </div>
          <h1 className="font-bold lg:text-6xl text-4xl text-secondary mt-5">
            INSTA_CHAT
          </h1>
          <span className="font-bold text-xs text-secondary">
            Share your moment with the world
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}
