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
import FavouritesBiodata from "../pages/Dashboard/Pages/FavouritesBiodata/FavouritesBiodata";
import DashboardLayout from "../layout/DashboardLayout";
import AdminDashboard from "../pages/Dashboard/Pages/AdminDashboard/AdminDashboard";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import RequestContact from "../pages/Dashboard/Pages/RequestContact/RequestContact";
import ManageUsers from "../pages/Dashboard/Pages/ManageUsers/ManageUsers";
import PremiumRequests from "../pages/Dashboard/Pages/PremiumRequests/PremiumRequests";
import ContactRequests from "../pages/Dashboard/Pages/ContactRequests/ContactRequests";
import BiodataDetails from "../pages/BiodataDetails/BiodataDetails";

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
      {
        path: "/biodata-details/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails></BiodataDetails>
          </PrivateRoute>
        ),
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
            <UserRoute>
              <EditBiodata></EditBiodata>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "view-biodata",
        element: (
          <PrivateRoute>
            <UserRoute>
              <ViewBiodata></ViewBiodata>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "contact-request",
        element: (
          <PrivateRoute>
            <UserRoute>
              <RequestContact></RequestContact>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "favourites-biodata",
        element: (
          <PrivateRoute>
            <UserRoute>
              <FavouritesBiodata></FavouritesBiodata>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard></AdminDashboard>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "premium-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <PremiumRequests></PremiumRequests>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "contact-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ContactRequests></ContactRequests>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
