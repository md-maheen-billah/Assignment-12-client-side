import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import {
  MdDashboard,
  MdPermContactCalendar,
  MdWorkspacePremium,
} from "react-icons/md";
import { FaPeoplePulling } from "react-icons/fa6";

const AdminMenu = ({ handleToggle }) => {
  return (
    <>
      <MenuItem
        onClick={handleToggle}
        icon={MdDashboard}
        label="Admin Dashboard"
        address="admin-dashboard"
      />
      <MenuItem
        onClick={handleToggle}
        icon={FaUserCog}
        label="Manage Users"
        address="manage-users"
      />
      <MenuItem
        onClick={handleToggle}
        icon={MdWorkspacePremium}
        label="Premium Requests"
        address="premium-requests"
      />
      <MenuItem
        onClick={handleToggle}
        icon={MdPermContactCalendar}
        label="Contact Requests"
        address="contact-requests"
      />
      <MenuItem
        onClick={handleToggle}
        icon={FaPeoplePulling}
        label="Success Story"
        address="success-story"
      />
    </>
  );
};

export default AdminMenu;
