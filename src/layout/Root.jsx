import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Root = () => {
  return (
    <div>
      <Navigation></Navigation>
      <Outlet />
    </div>
  );
};

export default Root;
