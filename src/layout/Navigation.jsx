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
          <span className="self-center whitespace-nowrap text-lg md:text-xl font-bold text-whiteM">
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
