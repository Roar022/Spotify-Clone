"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import Sidebaritem from "./Sidebaritem";
import Library from "./Library";
// Defining sideabar interface
interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  // adding hook
  // return current path in string
  const pathname = usePathname();

  // Memorizing
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search ",
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-full">
      {/* hidden on mobile and visible on computer */}
      <div
        className="
          hidden
          md:flex 
          flex-col
          gap-y-2
          bg-black
          h-full
          w-[300px]
          p-2
      "
      >
        <Box>
          <div
            className="
              flex
              flex-col
              gap-y-4
              px-5
              py-4
      "
          >
            {/* iterating above routes in React Memo */}
            {routes.map((item) => (
              // providing all routes properties to sidebar items.
              <Sidebaritem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
