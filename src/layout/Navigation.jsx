"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const Navigation = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const signOut = () => {
    // Your logout logic here
    logOut();
    // Close the dropdown
  };

  const getLinkClasses = (path) =>
    location.pathname === path
      ? "md:text-blackM text-whiteM lg:text-base rounded-md md:rounded-none lg:border-b-4 md:border-blackM border-black bg-black md:bg-reddM"
      : "text-whiteM lg:text-base hover:text-blue-400 lg:border-b-4 border-reddM";

  return (
    <div>
      <Navbar fluid className="bg-reddM">
        <Navbar.Brand as={Link} to="/">
          <span className="self-center whitespace-nowrap text-xl md:text-xl font-bold text-whiteM">
            Destined <span className="text-blackM">Affinity</span>
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {user ? (
            <div>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    className="border-2 rounded-full border-blackM"
                    alt="User settings"
                    img={user?.photoURL}
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm"> {user.displayName}</span>
                  <span className="block truncate text-sm font-medium">
                    {user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item onClick={() => signOut()}>Log Out</Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <Link to="/login">
              <button className="group relative z-10 px-6 py-2 overflow-hidden bg-black text-base text-white">
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                  Login
                </span>
                Login
              </button>
            </Link>
          )}
          <Navbar.Toggle className="bg-reddM hover:bg-red focus:ring-reddM focus:border-none focus:outline-none text-whiteM focus:bg-reddM" />
        </div>
        <Navbar.Collapse>
          <Navbar.Link as={Link} to="/" className={getLinkClasses("/")}>
            Home
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/biodatas"
            className={getLinkClasses("/biodatas")}
          >
            Biodatas
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/aboutus"
            className={getLinkClasses("/aboutus")}
          >
            About Us
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/contactus"
            className={getLinkClasses("/contactus")}
          >
            Contact Us
          </Navbar.Link>
          {user && (
            <>
              {role === "admin" ? (
                <Navbar.Link
                  as={Link}
                  to="/dashboard/admin-dashboard"
                  className={getLinkClasses("/dashboard/admin-dashboard")}
                >
                  Dashboard
                </Navbar.Link>
              ) : (
                <Navbar.Link
                  as={Link}
                  to="/dashboard/edit-biodata"
                  className={getLinkClasses("/dashboard/edit-biodata")}
                >
                  Dashboard
                </Navbar.Link>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
