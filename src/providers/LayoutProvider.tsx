"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./layout-components/Sidebar";
import { usePathname } from "next/navigation";
import { message } from "antd";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import { UsersStoreType, useUsersStore } from "@/store/users";
import Spinner from "@/components/spinner";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const { setLoggedInUserData }: UsersStoreType = useUsersStore() as any;
  const [loading, setLoading] = useState(false);

  const getCurrentUserData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserFromMongoDB();
      if (response.success) {
        setLoggedInUserData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUserData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (pathName.includes("sign-in") || pathName.includes("sign-up")) {
    return <>{children}</>;
  }
  return (
    <div className="flex lg:flex-row flex-col gap-3">
      <Sidebar />
      <div className="py-10 flex-1 px-7">{children}</div>
    </div>
  );
}

export default LayoutProvider;
