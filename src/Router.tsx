import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import {
  APP_DATE_DETAIL_ROUTE,
  APP_DATES_ROUTE,
  APP_BIODATA_FORM_ROUTE,
  APP_PROFILE_ROUTE,
  AUTH_LAYOUT_ROUTE,
  GROUP_CREATE_ROUTE,
  GROUP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  APP_PROFILE_EDIT_ROUTE,
  APP_DOCUMENT_CREATE_ROUTE,
  APP_ADDRESS_CREATE_ROUTE,
  APP_CONTACT_CREATE_ROUTE,
  APP_PROFILE_EDIT_MENU_ROUTE,
  APP_CONTACT_EDIT_ROUTE,
  APP_CONTACTS_EDIT_LIST_ROUTE,
  APP_ADDRESS_EDIT_ROUTE,
  EMPLOYEES_ROUTE,
  EMPLOYEE_CREATE_ROUTE,
  EMPLOYEE_DETAIL_ROUTE,
  EMPLOYEE_EDIT_MENU_ROUTE,
  EMPLOYEE_PROFILE_EDIT_ROUTE,
  EMPLOYEE_CONTACT_CREATE_ROUTE,
  EMPLOYEE_CONTACT_EDIT_ROUTE,
  EMP_CONTACTS_EDIT_LIST_ROUTE,
  EMP_ADDRESS_CREATE_ROUTE,
  EMPLOYEE_ADDR_EDIT_ROUTE,
  EMP_DOCUMENT_CREATE_ROUTE,
  EMP_PROFILE_ROUTE,
  PROFILE_ROUTE,
  USER_GROUP_ROUTE,
  APPLICANTS_ROUTE,
  APP_STAGE_NAME_ROUTE,
  APP_SCREENING_ROUTE,
} from "./cacheKeysAndRoutes";
import UnAuthLayout from "./components/UnAuthLayout";
import ErrorPage from "./pages/ErrorPage";
import RegistrationForm from "./accounts/RegistrationForm";
import LoginForm from "./accounts/LoginPage";
import AuthLayout from "./components/AuthLayout";
import GroupCreateForm from "./groupsAndPermissions/GroupCreateForm";
import GroupDetailPage from "./groupsAndPermissions/GroupDetailPage";
import MyChart from "./components/MyChart";
import ApplicationDatePage from "./pages/ApplicationDate/ApplicationDatePage";
import ApplicationDateEditPage from "./pages/ApplicationDate/ApplicationDateEditPage";
import ApplicantBiodataForm from "./pages/Applicant/ApplicantBiodataForm";
import ApplicantProfilePage from "./pages/Applicant/ApplicantProfilePage";
import ApplicantProfileEditPage from "./pages/Applicant/ApplicantProfileEditPage";
import ApplicantDocumentCreatePage from "./pages/Applicant/ApplicantDocumentCreatePage";
import ApplicantAddressCreatePage from "./pages/Applicant/ApplicantAddressCreatePage";
import ApplicantContactCreatePage from "./pages/Applicant/ApplicantContactCreatePage";
import ApplicantProfileEditMenu from "./pages/Applicant/AppProfileEditMenu";
import ApplicantContactEditPage from "./pages/Applicant/ApplicantContactEditPage";
import ApplicantContactsEditList from "./pages/Applicant/ApplicantContactsEditList";
import ApplicantAddressEditPage from "./pages/Applicant/ApplicantAddressEditPage";
import EmployeesListPage from "./pages/Employee/EmployeesListPage";
import EmployeeCreatePage from "./pages/Employee/EmployeeCreatePage";
import EmployeeDetailPage from "./pages/Employee/EmployeeDetailPage";
import EmployeeEditMenuPage from "./pages/Employee/EmployeeEditMenuPage";
import EmployeeProfileEditPage from "./pages/Employee/EmployeeProfileEditPage";
import EmployeeContactCreatePage from "./pages/Employee/EmployeeContactCreatePage";
import EmployeeContactEditPage from "./pages/Employee/EmployeeContactEditPage";
import EmployeeContactsEditList from "./pages/Employee/EmployeeContactsEditList";
import EmployeeAddressCreatePage from "./pages/Employee/EmployeeAddressCreatePage";
import EmployeeAddressEditPage from "./pages/Employee/EmployeeAddressEditPage";
import EmployeeDocumentCreatePage from "./pages/Employee/EmployeeDocumentCreatePage";
import EmployeeProfilePage from "./pages/Employee/EmployeeProfilePage";
import ProfilesWrapper from "./pages/ProfileWrapper";
import UserGroupsPage from "./pages/UserGroupPage";
import ApplicantsListForAdmin from "./pages/Applicant/ApplicantsListForAdmin";
import ApplicationStageName from "./pages/Applicant/AppStageName";
import ApplicantScreening from "./pages/ApplicantScreening/ApplicantScreening";

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
        path: APP_BIODATA_FORM_ROUTE,
        element: <ApplicantBiodataForm />,
      },
      {
        path: `${APP_DATE_DETAIL_ROUTE}/:id`,
        element: <ApplicationDateEditPage />,
      },
      { path: AUTH_LAYOUT_ROUTE, element: <MyChart /> },
      { path: APPLICANTS_ROUTE, element: <ApplicantsListForAdmin /> },
      { path: APP_PROFILE_ROUTE, element: <ApplicantProfilePage /> },
      {
        path: APP_PROFILE_EDIT_ROUTE,
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
      {
        path: APP_CONTACT_CREATE_ROUTE,
        element: <ApplicantContactCreatePage />,
      },
      {
        path: APP_PROFILE_EDIT_MENU_ROUTE,
        element: <ApplicantProfileEditMenu />,
      },
      {
        path: APP_CONTACTS_EDIT_LIST_ROUTE,
        element: <ApplicantContactsEditList />,
      },
      { path: APP_CONTACT_EDIT_ROUTE, element: <ApplicantContactEditPage /> },
      { path: APP_ADDRESS_EDIT_ROUTE, element: <ApplicantAddressEditPage /> },

      { path: APP_STAGE_NAME_ROUTE, element: <ApplicationStageName /> },

      { path: APP_SCREENING_ROUTE, element: <ApplicantScreening /> },

      { path: EMPLOYEES_ROUTE, element: <EmployeesListPage /> },
      { path: EMPLOYEE_CREATE_ROUTE, element: <EmployeeCreatePage /> },
      { path: `${EMPLOYEE_DETAIL_ROUTE}/:id`, element: <EmployeeDetailPage /> },
      { path: EMPLOYEE_EDIT_MENU_ROUTE, element: <EmployeeEditMenuPage /> },
      {
        path: EMPLOYEE_PROFILE_EDIT_ROUTE,
        element: <EmployeeProfileEditPage />,
      },
      {
        path: EMPLOYEE_CONTACT_CREATE_ROUTE,
        element: <EmployeeContactCreatePage />,
      },
      {
        path: EMPLOYEE_CONTACT_EDIT_ROUTE,
        element: <EmployeeContactEditPage />,
      },
      {
        path: EMP_CONTACTS_EDIT_LIST_ROUTE,
        element: <EmployeeContactsEditList />,
      },
      {
        path: EMP_ADDRESS_CREATE_ROUTE,
        element: <EmployeeAddressCreatePage />,
      },
      { path: EMPLOYEE_ADDR_EDIT_ROUTE, element: <EmployeeAddressEditPage /> },
      {
        path: EMP_DOCUMENT_CREATE_ROUTE,
        element: <EmployeeDocumentCreatePage />,
      },
      {
        path: EMP_PROFILE_ROUTE,
        element: <EmployeeProfilePage />,
      },
      { path: PROFILE_ROUTE, element: <ProfilesWrapper /> },
      { path: USER_GROUP_ROUTE, element: <UserGroupsPage /> },
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
