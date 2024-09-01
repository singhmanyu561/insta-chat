"use client";

import React from "react";
import Sidebar from "./layout-components/Sidebar";
import { usePathname } from "next/navigation";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  if (pathName.includes("sign-in") || pathName.includes("sign-up")) {
    return (
      <>
        {children}
      </>
    );
  }
  return (
    <div className="flex lg:flex-row flex-col gap-5">
      <Sidebar />
      {children}
    </div>
  );
}

export default LayoutProvider;
