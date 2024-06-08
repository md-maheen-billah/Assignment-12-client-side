import { MdEdit } from "react-icons/md";
import MenuItem from "./MenuItem";
import { FaPerson } from "react-icons/fa6";
import { LuHelpingHand } from "react-icons/lu";
import { TiPin } from "react-icons/ti";

const GuestMenu = ({ handleToggle }) => {
  return (
    <>
      <MenuItem
        onClick={handleToggle}
        icon={MdEdit}
        label="Edit Biodata"
        address="edit-biodata"
      />
      <MenuItem
        onClick={handleToggle}
        icon={FaPerson}
        label="View Biodata"
        address="view-biodata"
      />
      <MenuItem
        onClick={handleToggle}
        icon={LuHelpingHand}
        label="My Contact Request"
        address="contact-request"
      />
      <MenuItem
        onClick={handleToggle}
        icon={TiPin}
        label="Favorite Biodatas"
        address="favourites-biodata"
      />
    </>
  );
};

export default GuestMenu;
