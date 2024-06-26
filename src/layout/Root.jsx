import { Outlet, ScrollRestoration } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer/Footer";

const Root = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Navigation></Navigation>
      <Outlet />
      <Footer></Footer>
      <ScrollRestoration />
    </div>
  );
};

export default Root;
