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
import Payment from "../pages/Dashboard/Pages/Payment/Payment";
import GotMarried from "../pages/Dashboard/Pages/GotMarried/GotMarried";
import SuccessDash from "../pages/Dashboard/Pages/SuccessDash/SuccessDash";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
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
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
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
            <EditBiodata></EditBiodata>
          </PrivateRoute>
        ),
      },
      {
        path: "got-married",
        element: (
          <PrivateRoute>
            <GotMarried></GotMarried>
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
            <RequestContact></RequestContact>
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
      {
        path: "success-story",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SuccessDash></SuccessDash>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
