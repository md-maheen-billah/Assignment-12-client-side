import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import {
  MdDashboard,
  MdPermContactCalendar,
  MdWorkspacePremium,
} from "react-icons/md";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdDashboard}
        label="Admin Dashboard"
        address="admin-dashboard"
      />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={MdWorkspacePremium}
        label="Premium Requests"
        address="premium-requests"
      />
      <MenuItem
        icon={MdPermContactCalendar}
        label="Contact Requests"
        address="contact-requests"
      />
    </>
  );
};

export default AdminMenu;
