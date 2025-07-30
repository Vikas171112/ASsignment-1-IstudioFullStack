import React from "react";
import { useCreateTaskModalContext } from "@/hooks/Contexts/useCreateTaskContext";
import {
  FaCircle,
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

function Navbar() {
  const { setOpenCreateTaskModal } = useCreateTaskModalContext();
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/login");
  }

  return (
    <div className="flex justify-between items-center bg-blue-300 h-20 px-8">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {/* Tasks Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tasks</NavigationMenuTrigger>
            <NavigationMenuContent>
              <nav className="flex flex-col gap-2 p-2">
                <NavigationMenuLink
                  onClick={() => setOpenCreateTaskModal(true)}
                  className="flex items-center gap-2"
                >
                  <FaEdit />
                  <span>Create Task</span>
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/tasks"
                  className="flex items-center gap-2"
                >
                  <FaUser />
                  <span>View Tasks</span>
                </NavigationMenuLink>
              </nav>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Projects Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
            <NavigationMenuContent>
              <nav className="flex flex-col gap-2 p-2">
                <NavigationMenuLink
                  href="/projects/create"
                  className="flex items-center gap-2"
                >
                  <FaEdit />
                  <span>Create Project</span>
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/projects"
                  className="flex items-center gap-2"
                >
                  <FaUser />
                  <span>View Projects</span>
                </NavigationMenuLink>
              </nav>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Profile Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2">
              <FaUserCircle className="h-6 w-6" />
              <span>Profile</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <nav className="flex  gap-2 p-2">
                <NavigationMenuLink
                  href="/profile/edit"
                  className="flex items-center gap-2"
                >
                  <FaEdit />
                  <span>Edit Profile</span>
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/profile/details"
                  className="flex items-center gap-2"
                >
                  <FaUser />
                  <span>Profile Details</span>
                </NavigationMenuLink>
                <NavigationMenuLink
                  onClick={handleLogout}
                  href="/logout"
                  className="flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </NavigationMenuLink>
              </nav>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        <FaUserCircle className="h-10 w-25" />
        <span>{user?.name}</span>
      </div>
    </div>
  );
}

export default Navbar;
