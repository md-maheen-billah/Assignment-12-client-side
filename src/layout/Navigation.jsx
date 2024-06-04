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

  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-lg md:text-xl font-semibold dark:text-white">
            Destined Affinity
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {user ? (
            <div>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User settings" img={user?.photoURL} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm"> {user.displayName}</span>
                  <span className="block truncate text-sm font-medium">
                    {user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => signOut()}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <Link to="/login">
              <button className="font-bold ml-2 rounded-md px-4 py-2 bg-green-600 text-white relative overflow-hidden group z-10 hover:text-green duration-1000">
                <span className="absolute bg-white  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                <span className="absolute bg-green-400 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                Login
              </button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link as={Link} to="/" active={location.pathname === "/"}>
            Home
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/biodatas"
            active={location.pathname === "/biodatas"}
          >
            Biodatas
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/aboutus"
            active={location.pathname === "/aboutus"}
          >
            About Us
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/contactus"
            active={location.pathname === "/contactus"}
          >
            Contact Us
          </Navbar.Link>
          {user && (
            <>
              {role === "admin" ? (
                <Navbar.Link
                  as={Link}
                  to="/dashboard/admin-dashboard"
                  active={location.pathname === "/dashboard/admin-dashboard"}
                >
                  Dashboard
                </Navbar.Link>
              ) : (
                <Navbar.Link
                  as={Link}
                  to="/dashboard/edit-biodata"
                  active={location.pathname === "/dashboard/admin-dashboard"}
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
