import { MdEdit } from "react-icons/md";
import MenuItem from "./MenuItem";
import { FaPerson } from "react-icons/fa6";
import { LuHelpingHand } from "react-icons/lu";
import { TiPin } from "react-icons/ti";

const GuestMenu = () => {
  return (
    <>
      <MenuItem icon={MdEdit} label="Edit Biodata" address="edit-biodata" />
      <MenuItem icon={FaPerson} label="View Biodata" address="view-biodata" />
      <MenuItem
        icon={LuHelpingHand}
        label="My Contact Request"
        address="contact-request"
      />
      <MenuItem
        icon={TiPin}
        label="Favourites Biodata"
        address="favourites-biodata"
      />
    </>
  );
};

export default GuestMenu;
