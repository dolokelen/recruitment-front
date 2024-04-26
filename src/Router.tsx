import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import {
  APP_DATE_DETAIL_ROUTE,
  APP_DATES_ROUTE,
  APPLICANT_BIODATA_FORM_ROUTE,
  APPLICANT_PROFILE_ROUTE,
  AUTH_LAYOUT_ROUTE,
  GROUP_CREATE_ROUTE,
  GROUP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  APPLICANT_PROFILE_EDIT_ROUTE,
  APP_DOCUMENT_CREATE_ROUTE,
  APP_ADDRESS_CREATE_ROUTE,
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
import ApplicantBiodataForm from "./pages/ApplicantBiodataForm";
import ApplicantProfilePage from "./pages/ApplicantProfilePage";
import ApplicantProfileEditPage from "./pages/ApplicantProfileEditPage";
import ApplicantDocumentCreatePage from "./pages/ApplicantDocumentCreatePage";
import ApplicantAddressCreatePage from "./pages/ApplicantAddressCreatePage";

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
        path: APPLICANT_BIODATA_FORM_ROUTE,
        element: <ApplicantBiodataForm />,
      },
      {
        path: `${APP_DATE_DETAIL_ROUTE}/:id`,
        element: <ApplicationDateEditPage />,
      },
      { path: AUTH_LAYOUT_ROUTE, element: <MyChart /> },
      { path: APPLICANT_PROFILE_ROUTE, element: <ApplicantProfilePage /> },
      {
        path: APPLICANT_PROFILE_EDIT_ROUTE,
        element: <ApplicantProfileEditPage />,
      },
      {
        path: APP_DOCUMENT_CREATE_ROUTE,
        element: <ApplicantDocumentCreatePage />,
      },
      {
        path: APP_ADDRESS_CREATE_ROUTE,
        element: <ApplicantAddressCreatePage />,
      },
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
