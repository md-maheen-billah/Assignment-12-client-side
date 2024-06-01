import MenuItem from "./MenuItem";
import { BsFingerprint } from "react-icons/bs";

const GuestMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="Edit Biodata"
        address="edit-biodata"
      />
      <MenuItem
        icon={BsFingerprint}
        label="View Biodata"
        address="view-biodata"
      />
      <MenuItem
        icon={BsFingerprint}
        label="My Contact Request"
        address="contact-request"
      />
      <MenuItem
        icon={BsFingerprint}
        label="Favourites Biodata"
        address="favourites-biodata"
      />
    </>
  );
};

export default GuestMenu;
