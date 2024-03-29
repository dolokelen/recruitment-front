import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../accounts/LoginForm";
import HomePage from "../components/HomePage";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "../cacheKeysAndRoutes";
import RegistrationForm from "../accounts/RegistrationForm";

const router = createBrowserRouter([
  { path: HOME_ROUTE, element: <HomePage /> },
  { path: `${LOGIN_ROUTE}/`, element: <LoginForm /> },
  { path: `${REGISTER_ROUTE}/`, element: <RegistrationForm /> },
]);

export default router;
