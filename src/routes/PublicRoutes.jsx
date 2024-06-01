import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Biodatas from "../pages/Biodatas/Biodatas";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContatcUs from "../pages/ContactUs/ContatcUs";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import EditBiodata from "../pages/Dashboard/Pages/EditBiodata/EditBiodata";
import ViewBiodata from "../pages/Dashboard/Pages/ViewBiodata/ViewBiodata";
import ContactRequest from "../pages/Dashboard/Pages/ContactRequest/ContactRequest";
import FavouritesBiodata from "../pages/Dashboard/Pages/FavouritesBiodata/FavouritesBiodata";
import DashboardLayout from "../layout/DashboardLayout";
import AdminDashboard from "../pages/Dashboard/Pages/AdminDashboard/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "biodatas",
        element: <Biodatas></Biodatas>,
      },
      {
        path: "aboutus",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "contactus",
        element: <ContatcUs></ContatcUs>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "edit-biodata",
        element: (
          <PrivateRoute>
            <EditBiodata></EditBiodata>
          </PrivateRoute>
        ),
      },
      {
        path: "view-biodata",
        element: (
          <PrivateRoute>
            <ViewBiodata></ViewBiodata>
          </PrivateRoute>
        ),
      },
      {
        path: "contact-request",
        element: (
          <PrivateRoute>
            <ContactRequest></ContactRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "favourites-biodata",
        element: (
          <PrivateRoute>
            <FavouritesBiodata></FavouritesBiodata>
          </PrivateRoute>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminDashboard></AdminDashboard>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
