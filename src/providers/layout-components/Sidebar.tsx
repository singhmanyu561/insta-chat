import React, { useState } from "react";
import MenuItems from "./MenuItems";
import { Menu } from "lucide-react";
import { Drawer } from "antd";

function Sidebar() {
  const [showMobileSidebar, setShowMobileSideBar] = useState(false);
  return (
    <div>
      <div className="bg-info px-5 py-2 lg:hidden">
        <Menu
          size={24}
          color="white"
          className="cursor-pointer"
          onClick={() => setShowMobileSideBar(!showMobileSidebar)}
        />
        <Drawer open={showMobileSidebar} onClose={()=> setShowMobileSideBar(false)}placement="left">
          <MenuItems />
        </Drawer>
      </div>
      <div className="hidden lg:flex">
        <MenuItems />
      </div>
    </div>
  );
}

export default Sidebar;
