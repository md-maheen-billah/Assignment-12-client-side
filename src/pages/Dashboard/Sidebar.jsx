import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import MenuItem from "./Menu/MenuItem";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import GuestMenu from "./Menu/GuestMenu";
import AdminMenu from "./Menu/AdminMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isLoading] = useRole();
  console.log(role, isLoading);
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-reddM text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <span className="self-center whitespace-nowrap text-xl md:text-xl font-bold text-whiteM">
                Destined <span className="text-blackM">Affinity</span>
              </span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-reddM w-64 lg:w-72 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div className="block md:hidden cursor-pointer px-4 font-bold">
            <Link to="/">
              <span className="self-center whitespace-nowrap text-xl md:text-xl font-bold text-whiteM">
                Destined <span className="text-blackM">Affinity</span>
              </span>
            </Link>
          </div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center  mx-auto">
              <Link to="/">
                <span className="self-center whitespace-nowrap text-xl md:text-xl font-bold text-whiteM">
                  Destined <span className="text-blackM">Affinity</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {role === "guest" && <GuestMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-whiteM hover:bg-blackM transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
