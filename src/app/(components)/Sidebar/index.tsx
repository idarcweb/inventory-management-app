"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed, setIsModalOpen } from "@/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center transition-all duration-500 ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }
      }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700 transition-all duration-500`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { isSidebarCollapsed, isModalOpen } = useAppSelector(
    (state) => state.global
  );
  const toogleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  const sidebarClassNames = `${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } fixed flex flex-col bg-white transition-all duration-700 overflow-hidden h-full shadow-md z-40`;

  const toggleModal = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    dispatch(setIsModalOpen(!isModalOpen));
  };

  return (
    <>
      {/* modal */}
      <div
        onClick={toggleModal}
        className={`${
          isSidebarCollapsed && "hidden"
        } absolute w-full h-full bg-slate-50/15 z-10 top-0 left-0 md:hidden overflow-hidden`}
      />
      <div className={sidebarClassNames}>
        {/* TOP LOGO */}
        <div
          className={`${
            isSidebarCollapsed ? "px-5" : "px-8"
          } flex gap-3 justify-between md:justify-normal items-center pt-8 transition-all duration-500`}
        >
          <h1
            className={`${
              isSidebarCollapsed ? "hidden" : "block"
            } font-extrabold text-2xl`}
          >
            idarcstock
          </h1>

          <button
            onClick={toogleSidebar}
            className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-all duration-500"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex-grow mt-8">
          <SidebarLink
            href="/dashboard"
            icon={Layout}
            label="Dashboard"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            href="/inventory"
            icon={Archive}
            label="Inventory"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            href="/products"
            icon={Clipboard}
            label="Products"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            href="/users"
            icon={User}
            label="Users"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            href="/settings"
            icon={SlidersHorizontal}
            label="Settings"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            href="/expenses"
            icon={CircleDollarSign}
            label="Expenses"
            isCollapsed={isSidebarCollapsed}
          />
        </div>

        {/* FOOTER */}
        <div
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } mb-10 transition-all duration-500`}
        >
          <p className="text-center text-xs text-gray-500">
            &copy; 2024 idarcStock
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
