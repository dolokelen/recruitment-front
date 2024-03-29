import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/HomePage";
import { HOME_ROUTE } from "../cacheKeysAndRoutes";
import UnAuthLayout from "../components/UnAuthLayout";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  // The auth routers here
  {
    path: HOME_ROUTE,
    errorElement: <UnAuthLayout children={<ErrorPage />} />,
    element: <UnAuthLayout />,
    children: [{ path: HOME_ROUTE, element: <HomePage /> }],
  },
]);

export default router;
