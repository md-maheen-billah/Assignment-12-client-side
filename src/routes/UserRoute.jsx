import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useRole from "../hooks/useRole";

const UserRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "guest") return children;
  return <Navigate to="/dashboard/admin-dashboard" />;
};

export default UserRoute;

UserRoute.propTypes = {
  children: PropTypes.element,
};
