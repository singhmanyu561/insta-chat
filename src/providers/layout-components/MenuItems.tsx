import React from "react";
import { Bell, Home, LogOut, Search, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

function MenuItems() {
  const iconSize = 20;
  const pathName = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const menuItems = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      path: "/",
      isActive: pathName === "/",
    },
    {
      name: "Search",
      icon: <Search size={iconSize} />,
      path: "/search",
      isActive: pathName === "/search",
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      path: "/profile",
      isActive: pathName === "/profile",
    },
    {
      name: "Notifications",
      icon: <Bell size={iconSize} />,
      path: "/notifications",
      isActive: pathName === "/notifications",
    },
    {
      name: "Logout",
      icon: <LogOut size={iconSize} />,
      path: "/logout",
    },
  ];

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <div className="w-56 lg:h-screen p-5 lg:bg-gray-300">
      <div className="mt-10 flex flex-col">
        <span className="text-2xl font-bold text-info">
          INSTA <b className="text-primary">CHAT</b>
        </span>
        <span className="text-sm">Logged-in username</span>
      </div>
      <div className="mt-20 flex flex-col gap-10">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer px-5 py-2 flex gap-3 items-center ${
              item.isActive && "bg-info text-white rounded-sm"
            }`}
            onClick={() => {
              if (item.name === "Logout") {
                handleLogout();
              } else {
                router.push(item.path);
              }
            }}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItems;
