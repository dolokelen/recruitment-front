import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import {
  APP_DATE_DETAIL_ROUTE,
  APP_DATES_ROUTE,
  AUTH_LAYOUT_ROUTE,
  CHART_ROUTE,
  GROUP_CREATE_ROUTE,
  GROUP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "./cacheKeysAndRoutes";
import UnAuthLayout from "./components/UnAuthLayout";
import ErrorPage from "./pages/ErrorPage";
import RegistrationForm from "./accounts/RegistrationForm";
import LoginForm from "./accounts/LoginPage";
import AuthLayout from "./components/AuthLayout";
import GroupCreateForm from "./groupsAndPermissions/GroupCreateForm";
import GroupDetailPage from "./groupsAndPermissions/GroupDetailPage";
import MyChart from "./components/MyChart";
import ApplicationDatePage from "./pages/ApplicationDatePage";
import ApplicationDateEditPage from "./pages/ApplicationDateEditPage";

const router = createBrowserRouter([
  {
    path: AUTH_LAYOUT_ROUTE,
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [
      { path: GROUP_CREATE_ROUTE, element: <GroupCreateForm /> },
      { path: `${GROUP_ROUTE}/:id`, element: <GroupDetailPage /> },
      { path: APP_DATES_ROUTE, element: <ApplicationDatePage /> },
      {
        path: `${APP_DATE_DETAIL_ROUTE}/:id`,
        element: <ApplicationDateEditPage />,
      },
      { path: CHART_ROUTE, element: <MyChart /> },
    ],
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
