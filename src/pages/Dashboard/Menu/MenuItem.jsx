import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon, onClick }) => {
  return (
    <NavLink
      to={address}
      onClick={onClick}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-blackM   hover:text-whiteM ${
          isActive ? "bg-blackM  text-whiteM" : "text-whiteM"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};
MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.elementType,
  onClick: PropTypes.func,
};

export default MenuItem;
