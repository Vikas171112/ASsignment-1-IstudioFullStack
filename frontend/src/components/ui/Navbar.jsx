import React, { useState } from "react";
import { useCreateTaskModalContext } from "@/hooks/Contexts/useCreateTaskContext";
import {
  FaBars,
  FaTimes,
  FaEdit,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import { useAuthContext } from "@/hooks/Contexts/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { SearchInput } from "../SearchInput";

function Navbar() {
  const { setOpenCreateTaskModal } = useCreateTaskModalContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/login");
    setMenuOpen(false);
  }

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo + Hamburger */}
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
          <h1 className="font-bold text-lg cursor-pointer">TaskManager</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="flex items-center gap-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger className=" text-black hover:bg-blue-900 px-3 py-2 rounded-md transition">
                  Tasks
                </NavigationMenuTrigger>
                <NavigationMenuContent className="mt-2 bg-white text-black rounded shadow w-40 p-2">
                  <nav className="flex flex-col gap-2">
                    <NavigationMenuLink
                      onClick={() => setOpenCreateTaskModal(true)}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <FaEdit /> Create Task
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      href="/tasks"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <FaUser /> View Tasks
                    </NavigationMenuLink>
                  </nav>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className=" text-black hover:bg-blue-700 px-3 py-2 rounded-md transition">
                  Projects
                </NavigationMenuTrigger>
                <NavigationMenuContent className="mt-2 bg-white text-black rounded shadow w-40 p-2">
                  <nav className="flex flex-col gap-2">
                    <NavigationMenuLink
                      href="/projects/create"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <FaEdit /> Create Project
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      href="/projects"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <FaUser /> View Projects
                    </NavigationMenuLink>
                  </nav>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className=" text-black hover:bg-blue-700 px-3 py-2 rounded-md transition flex items-center gap-2">
                  <FaUserCircle /> Profile
                </NavigationMenuTrigger>
                <NavigationMenuContent className="mt-2 bg-white text-black rounded shadow w-40 p-2">
                  <nav className="flex flex-col gap-2">
                    <NavigationMenuLink
                      href="/profile/edit"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <FaEdit /> Edit Profile
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      href="/profile/details"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <FaUser /> Profile Details
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      onClick={handleLogout}
                      href="/logout"
                      className="flex items-center gap-2 hover:text-red-600"
                    >
                      <FaSignOutAlt /> Logout
                    </NavigationMenuLink>
                  </nav>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <SearchInput type="text" placeholder="Search Projects..." />

          <Button
            className="bg-white text-blue-600 hover:bg-gray-200"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 text-white px-4 py-4">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setOpenCreateTaskModal(true);
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 hover:underline"
            >
              <FaEdit /> Create Task
            </button>
            <button
              onClick={() => {
                navigate("/tasks");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 hover:underline"
            >
              <FaUser /> View Tasks
            </button>
            <button
              onClick={() => {
                navigate("/projects/create");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 hover:underline"
            >
              <FaEdit /> Create Project
            </button>
            <button
              onClick={() => {
                navigate("/projects");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 hover:underline"
            >
              <FaUser /> View Projects
            </button>
            <button
              onClick={() => {
                navigate("/profile/details");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 hover:underline"
            >
              <FaUserCircle /> Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-300 hover:underline"
            >
              <FaSignOutAlt /> Logout
            </button>

            <SearchInput type="text" placeholder="Search Projects..." />

            <Button
              className="bg-white  text-blue-600 hover:bg-gray-200"
              onClick={() => {
                navigate("/dashboard");
                setMenuOpen(false);
              }}
            >
              Dashboard
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
