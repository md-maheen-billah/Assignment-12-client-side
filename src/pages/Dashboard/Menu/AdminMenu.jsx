import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUserCog}
        label="Admin Dashboard"
        address="admin-dashboard"
      />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={FaUserCog}
        label="Premium Requests"
        address="premium-requests"
      />
      <MenuItem
        icon={FaUserCog}
        label="Contact Requests"
        address="contact-requests"
      />
    </>
  );
};

export default AdminMenu;
