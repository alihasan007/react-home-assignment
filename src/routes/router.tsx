// router.tsx
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import EpicDetail from "../pages/EpicDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />, // Home loads dashboard
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/epic/:epicId",
    element: <EpicDetail />, // Epic detail page
  },
]);

export default router;
