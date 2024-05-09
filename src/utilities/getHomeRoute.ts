import { useLocation } from "react-router-dom";
import { HOME_ROUTE } from "../cacheKeysAndRoutes";

const autoRouteToHome = () => {
  const location = useLocation();
  let fullPath = location.pathname;
  fullPath = HOME_ROUTE;
  return fullPath;
}; 

export default autoRouteToHome;
