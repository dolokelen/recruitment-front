import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/HomePage";
import {
  AUTH_LAYOUT_ROUTE,
  CREATE_GROUP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "../cacheKeysAndRoutes";
import UnAuthLayout from "../components/UnAuthLayout";
import ErrorPage from "../pages/ErrorPage";
import RegistrationForm from "../accounts/RegistrationForm";
import LoginForm from "../accounts/LoginPage";
import AuthLayout from "../components/AuthLayout";
import GroupCreateForm from "../groupsAndPermissions/GroupCreateForm";

const router = createBrowserRouter([
  {
    path: AUTH_LAYOUT_ROUTE,
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [{ path: CREATE_GROUP_ROUTE, element: <GroupCreateForm /> }],
  },

  {
    path: HOME_ROUTE,
    errorElement: <UnAuthLayout children={<ErrorPage />} />,
    element: <UnAuthLayout />,
    children: [
      { path: HOME_ROUTE, element: <HomePage /> },
      {
        path: REGISTER_ROUTE,
        element: <RegistrationForm />,
      },
      {
        path: LOGIN_ROUTE,
        element: <LoginForm />,
      },
    ],
  },
]);

export default router;
